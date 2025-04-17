import feedparser
import json

# Parse the RSS feed
feed = feedparser.parse("http://feeds.bbci.co.uk/news/rss.xml")

# Extract top 10 headlines with index
news_data = [
    {"index": i+1, "title": entry.title, "link": entry.link}
    for i, entry in enumerate(feed.entries[:10])
]

# Save to the specified file path
with open("BBC_SCRAPE.JSON", "w", encoding="utf-8") as f:
    json.dump(news_data, f, indent=4, ensure_ascii=False)

print("Data has been stored in 'BBC_SCRAPE.JSON'.")
