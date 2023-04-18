FROM wordpress:6.2

WORKDIR /var/www/html

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp

RUN rm -rf wp-content/*

RUN apt update -y && apt upgrade -y

# Copy the files
COPY . wp-content

RUN tac /usr/local/bin/docker-entrypoint.sh | sed -e 1a"sh /var/www/html/wp-content/docker-build-utils/setup-wp.sh;" | tac | cat > /usr/local/bin/docker-entrypoint.sh.copy

RUN cat /usr/local/bin/docker-entrypoint.sh.copy > /usr/local/bin/docker-entrypoint.sh

VOLUME wp-content/uploads

EXPOSE 80

