const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const express = require("express");
const app = express();

const keyVaultName = "RoshKeyvault"; // your vault name
//const vaultUrl = `https://${keyVaultName}.vault.azure.net`;
const vaultUrl = 'https://roshkeyvault.vault.azure.net';
const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

app.get("/", async (req, res) => {
  
  try {
    const secret = await client.getSecret("ROSHsecretKey"); //you secret name
    res.send('Hello from Azure App Service!');
    res.send(`Secret value: ${secret.value}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching secret");
  }
});

//app.listen(3000, () => console.log("App running on http://localhost:3000"));
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
