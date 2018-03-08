import os
import sys

from newspaper import Article

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers'))

import cnn_news_scrapers
from cloudAMQP_client import CloudAMQPClient

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://rowtrkhd:8LeEJmVDM3so-uWwggQWdTY6QpeyIDOb@otter.rmq.cloudamqp.com/rowtrkhd"
DEDUPE_NEWS_TASK_QUEUE_NAME = 'tap-news-dedupe-news-task-queue'
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://zgtqdvzx:oknHkgY98riEglSVfCA4LV5pT0T386bm@otter.rmq.cloudamqp.com/zgtqdvzx"
SCRAPE_NEWS_TASK_QUEUE_NAME = "tap-news-scrape-news-task-queue"

SLEEP_TIME_IN_SECONDS = 5

dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict):
        print 'message is broken'
        return

    task = msg

    article = Article(task['url'])
    article.download()
    article.parse()

    task['text'] = article.text

    dedupe_news_queue_client.sendMessage(task)



while True:
    if scrape_news_queue_client is not None:
        msg = scrape_news_queue_client.getMessage()
        if msg is not None:
            try:
                handle_message(msg)
            except Exception as e:
                print e
                pass
        scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
