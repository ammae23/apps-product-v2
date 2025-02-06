## APPS Product 


### Install Node.Js & Depedency

```
sudo yum update -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | /bin/bash
sudo yum install -y npm git
sudo npm install bootstrap
sudo npm add axios
sudo npm install react-router-dom
```

### Clone Repository

```
cd ~
git clone https://github.com/bmx22/apps-product-v2
cd apps-product-v2
```


### Install & Running React apps

```
npm install 
npm run build 
npm run dev 
```


### Setup React Apps running on backend

#### Create systemd

```
sudo nano /lib/systemd/system/product.service
```

Add code bellow :

```
[Unit]
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/apps-product-v2
ExecStart=/usr/bin/node /home/ec2-user/apps-product-v2/server.js
Restart=always
StandardOutput=append:/var/log/product.log
StandardError=append:/var/log/product.log

[Install]
WantedBy=multi-user.target

```

#### Restart services

```
sudo systemctl daemon-reload
sudo systemctl start product
sudo systemctl enable product
sudo systemctl status product
```

### Install Nginx
```
sudo yum update -y
sudo yum install -y nginx
```

### Setup nginx for reverse proxy


```
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
sudo nano /etc/nginx/sites-available/apps-product.conf

server {
    listen 80;
    server_name YOUR_ALB_DNS;  # Sesuaikan dengan domain Load Balancer kamu

    location / {
        root /home/ec2-user/apps-product-v2/build; # Path ke build React
        index index.html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/; # Jika ada backend di port 5000, sesuaikan
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

```
sudo unlink /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/ apps-product.conf /etc/nginx/sites-enabled/product-apps.conf
sudo systemctl restart nginx
sudo systemctl status nginx
```