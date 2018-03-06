service redis_6379 start
service mongod start

pip install -r requirements.txt

cd news_pipeline
python news_moniter.py &
python news_fetcher.py &
python news_deduper.py &

echo "========================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)
