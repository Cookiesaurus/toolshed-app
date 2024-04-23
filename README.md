<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Cookiesaurus/toolshed-app/">
    <img src="/app/public/images/the-tool-shed-logo-transparent-bg.png" alt="Logo" width="300" height="300">
  </a>

<h1 align="center">SEAC Tool Shed</h3>

  <p align="center">
    A functional database application and interface for the <a href="https://seacrochester.org/">South East Area Coalition (SEAC)</a> organization's <a href="https://seactoolshed.org/">Tool Shed</a> program.
    <br />
    <br />
    <a href="https://github.com/Cookiesaurus/toolshed-app/wiki"><strong>Explore the docs »</strong></a>
  </p>
</div>

### Built With
![Next JS](https://img.shields.io/badge/Next.JS-black?style=for-the-badge&logo=next.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Square](https://img.shields.io/badge/Square-black?style=for-the-badge&logo=square&logoColor=white)

## Pre-Reqs
Node.js installation: 
- Mac: [Using brew](https://formulae.brew.sh/formula/node)
    - [Installing brew](https://brew.sh/)
- Windows: [Using nodist](https://github.com/nodists/nodist?tab=readme-ov-file#installation)

Node version manager:
- Mac: [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- Windows: Nodist is a node version manager so no installation necessary 


## Getting Started

First, install necessary packages in the a new terminal in VS Code:
```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

## Database credentials
Create a ```.env.local``` file and add in associated credentials:
- DB_HOSTNAME
- DB
- DB_USER
- DB_PORT
- DB_PASSWORD


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
