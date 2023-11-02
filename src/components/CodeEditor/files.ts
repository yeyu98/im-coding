/*
 * @Author: lzy-Jerry
 * @Date: 2023-11-02 21:59:30
 * @LastEditors: lzy-Jerry
 * @LastEditTime: 2023-11-02 22:19:32
 * @Description:
 */
// 这里以express为例，创建一个express运行文件 & package.json
export const files = {
  "index.js": {
    file: {
      contents: `
      import express from 'express';
      const app = express();
      const port = 3111;

      app.get('/', (req, res) => {
        res.send('Welcome to a WebContainers app! 🥳');
      });

      app.listen(port, () => {
        console.log(\`App is live at http://localhost:\${port}\`);
      });
      `,
    },
  },
  "package.json": {
    file: {
      contents: `
      {
        "name": "express-app",
        "type": "module",
        "dependencies": {
          "express": "latest",
          "nodemon": "latest"
        },
        "scripts": {
          "start": "nodemon --watch './' index.js"
        }
      }`,
    },
  },
};
