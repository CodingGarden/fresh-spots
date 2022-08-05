# fresh project

### Install Deno

This project uses Deno! Install for your OS by following the instructions
[here](https://deno.land/#installation)

### Environment Variables

Copy the `.env.sample` file into `.env`:

```sh
cp .env.sample .env
```

Update the values accordingly (if using Docker, the values can stay as is).

Discord client id and secret can be acquired
[here](https://discord.com/developers/applications).

### Database

If using Docker, you can run from this directory to spin up a postgres database:

```sh
docker-compose start
```

### Usage

Start the project (this will install dependencies on first run):

```
deno task start
```

This will watch the project directory and restart as necessary.
