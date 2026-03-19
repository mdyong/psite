require "json"

FILES = [
  "/Users/user/Downloads/P들의 서재 - 2026.tsv",
  "/Users/user/Downloads/P들의 서재 - 2025.tsv",
  "/Users/user/Downloads/P들의 서재 - 2024(20권).tsv",
  "/Users/user/Downloads/P들의 서재 - 2023 (18권).tsv"
].freeze

def extract_year(path)
  File.basename(path)[/\d{4}/].to_i
end

def normalize(value)
  value.to_s.gsub("\u00A0", " ").strip
end

def parse_title_and_author(cell)
  title, author = normalize(cell).split("_", 2)
  [normalize(title), normalize(author)]
end

def book_header?(cols)
  header = normalize(cols[3])
  return false if header.empty?
  return false if header == "위픽시리즈"

  cols[0].to_s.match?(/^\d+$/) && (header.include?("_") || header.match?(/[가-힣A-Za-z]/))
end

books = []

FILES.each do |path|
  year = extract_year(path)
  current = nil

  File.readlines(path, chomp: true, encoding: "UTF-8").each do |line|
    cols = line.split("\t").map { |value| normalize(value) }
    next if cols.all?(&:empty?)

    if book_header?(cols)
      title, author = parse_title_and_author(cols[3])
      current = {
        year: year,
        title: title,
        author: author,
        averageRating: nil,
        reviews: []
      }
      books << current
      next
    end

    member = cols[2]
    section_break = cols[0].to_s.match?(/^(번외|\d+)$/)
    current = nil if section_break && !book_header?(cols) && member !~ /^(강세영|김민정|박수인|유예림|유하림)$/

    next unless current
    next unless member =~ /^(강세영|김민정|박수인|유예림|유하림)$/

    review = cols[3]
    rating = cols[4]&.to_f
    average = cols[5]&.to_f

    current[:reviews] << {
      member: member,
      review: review,
      rating: rating
    }
    current[:averageRating] = average if average && average.positive?
  end
end

books.each do |book|
  if book[:averageRating].nil? && !book[:reviews].empty?
    rated = book[:reviews].select { |review| review[:rating].to_f.positive? }
    next if rated.empty?

    sum = rated.sum { |review| review[:rating].to_f }
    book[:averageRating] = (sum / rated.size).round(2)
  end
end

books = books.select do |book|
  book[:title] && !book[:title].empty? &&
    book[:averageRating].to_f.positive? &&
    book[:reviews].any? { |review| review[:review] && !review[:review].empty? }
end

books.each do |book|
  book[:reviews].select! do |review|
    review[:rating].to_f.positive? || (review[:review] && !review[:review].empty?)
  end
end

puts JSON.pretty_generate(books)
