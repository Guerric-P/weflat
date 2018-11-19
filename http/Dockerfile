FROM httpd:2.4.37

# Add application files
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

CMD [“/usr/sbin/httpd”, “-D”, “FOREGROUND”]

EXPOSE 80