# VulnLogin
VulnLogin is a simple vulnerable login page for demonstrating different cyber security tools.

## Current Vulnerabilities
* **Simple Admin Password** - This login page has a *very* simple passwords. Great for showing off `hydra`!
* **Too Detailed Errors** - This login page will tell you the username doesn't exist, this means that you can keep testing usernames until you get an error about an incorrect password.
* **Cookies** - This login page doesn't use sessions, so you can change the username in the cookie to switch users.

## Users
| Username |
| -------- |
| admin |
| root |
| guest |
| michael |

## Setup
These instructions are for setting this up on a Linux system.

```sh
# install node.js
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs gcc g++ make

# install yarn package manager
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

# get all the vulnlogin code from github and install dependencies
git clone https://github.com/jake-walker/vulnlogin
cd vulnlogin
yarn install

# run vulnlogin
node index.js
```

### Running for long periods
If you will be running this for long periods (e.g as a demo), it might be worth setting up something like `pm2` to manage the process by auto-restarting on crash, etc..

```sh
# install pm2
yarn global add pm2

# start vulnlogin with pm2
pm2 start /path/to/vulnlogin/index.js --name vulnlogin

# start pm2 on boot
pm2 startup
pm2 save
```

Run on port 80 without root: http://pm2.keymetrics.io/docs/usage/specifics/#listening-on-port-80-w-o-root