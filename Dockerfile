# base image
FROM php:7.4-fpm-alpine

# set working directory
WORKDIR /var/www/html/server

# install dependencies
RUN apk update && apk add --no-cache \
    build-base \
    libzip-dev \
    oniguruma-dev \
    unzip \
    zip \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

# copy source code
COPY . .

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# install dependencies
RUN composer install --no-scripts --no-autoloader

# copy configuration files
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/www.conf

# generate autoload files
RUN composer dump-autoload --no-scripts --optimize

# expose port 9000
EXPOSE 9000

# start php-fpm
CMD ["php-fpm"]
