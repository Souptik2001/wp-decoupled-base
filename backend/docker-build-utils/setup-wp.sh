#! /bin/sh

cd /var/www/html

pwd

wp core install --url=http://localhost:8080 --title=Test --admin_user=admin --admin_password=admin --admin_email=admin@test.com --allow-root

apt install mariadb-client -y

wp db import ./wp-content/db-dump.sql --allow-root

wp search-replace "https://test.lndo.site" "http://localhost:8080" --all-tables --allow-root

wp search-replace "test.lndo.site" "localhost:8080" --all-tables --allow-root

wp plugin activate wp-rest-api-v2-menus --allow-root

