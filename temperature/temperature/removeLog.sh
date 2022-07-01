reserved_lines=20000
path="/root/web/temperature/temperature/uwsgi.log"
lines=$(wc -l $path | awk '{print$1}')
if [ $lines -gt $reserved_lines ]
then
	sed -i "39,$[ $lines-$reserved_lines ]d" $path
	lines=$(wc -l $path | awk '{print$1}')
fi
echo $lines
