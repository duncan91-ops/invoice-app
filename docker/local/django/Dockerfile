FROM python:3.11.0-slim-buster

ENV APP_HOME=/app
RUN mkdir ${APP_HOME}
RUN mkdir ${APP_HOME}/staticfiles
WORKDIR ${APP_HOME}

LABEL maintainer='duncankithinji91@gmail.com'
LABEL youtube='https://www.youtube.com/@duncan91-ops'
LABEL description='Development Image for Invoices Project'

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  && apt-get install -y build-essential \
  && apt-get install -y libpq-dev \
  && apt-get install -y gettext \
  && apt-get install -y netcat gcc postgresql \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install -U pip

COPY ./requirements.txt /app/requirements.txt

RUN pip3 install -r requirements.txt

COPY ./scripts/entrypoint /entrypoint
# line endings
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./scripts/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./scripts/celery/worker/start /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker
RUN chmod +x /start-celeryworker

COPY ./scripts/celery/flower/start /start-flower
RUN sed -i 's/\r$//g' /start-flower
RUN chmod +x /start-flower

ENTRYPOINT [ "/entrypoint" ]