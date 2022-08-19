const puppeteer = require("puppeteer");
console.log("rodando");

async function robo(site) {
  const date = new Date();

  const dataHora =
    "(" +
    date.getDate() +
    "-" +
    date.getMonth() +
    "-" +
    date.getFullYear() +
    ")" +
    date.getHours() +
    ";" +
    date
      .getMinutes()
      .toString()
      .replace(/^(\d)$/, "0$1") +
    ";" +
    date.getSeconds();

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 1366});
  await page.goto(site, { waitUntil: 'networkidle2', timeout: 0 })
  await page.waitForSelector('#root', {visible: true});
  await page.screenshot({ path: `./printcreens/print${dataHora}.png` });
  await page.pdf({ path: `./pdf/arquivo${dataHora}.pdf`, format: "a0" });

  await browser.close();
}

robo("URL");

