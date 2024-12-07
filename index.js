document.getElementById('ip-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const ip = document.getElementById('ip-input').value;
  const errorElement = document.getElementById('error');
  const outputElement = document.getElementById('output');

  errorElement.innerHTML = '';
  outputElement.innerHTML = '';

  if (!ip) {
    errorElement.innerHTML = 'Por favor, informe um IP.';
    return;
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=c338c8d81c4186`);

    if (!response.ok) {
      errorElement.innerHTML = 'Erro ao consultar o IP.';
      return;
    }

    const data = await response.json();

    const locationData = `
      <div>
        <h3>Informações sobre o IP: ${data.ip}</h3>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>Região:</strong> ${data.region}</p>
        <p><strong>País:</strong> ${data.country}</p>
        <p><strong>CEP:</strong> ${data.postal}</p>
        <p><strong>Fuso Horário:</strong> ${data.timezone}</p>
        <p><strong>Localização (Latitude, Longitude):</strong> ${data.loc}</p>
      </div>
    `;

    outputElement.innerHTML = locationData;

    if (data.asn) {
      const asnData = `
        <h4>ASN (Sistema Autônomo)</h4>
        <p><strong>ASN:</strong> ${data.asn.asn}</p>
        <p><strong>Nome:</strong> ${data.asn.name}</p>
        <p><strong>Domínio:</strong> ${data.asn.domain}</p>
        <p><strong>Tipo:</strong> ${data.asn.type}</p>
      `;
      outputElement.innerHTML += asnData;
    }

    if (data.company) {
      const companyData = `
        <h4>Informações sobre a Empresa</h4>
        <p><strong>Nome da Empresa:</strong> ${data.company.name}</p>
        <p><strong>Domínio:</strong> ${data.company.domain}</p>
        <p><strong>Tipo:</strong> ${data.company.type}</p>
      `;
      outputElement.innerHTML += companyData;
    }

    if (data.privacy) {
      const privacyData = `
        <h4>Privacidade</h4>
        <p><strong>VPN:</strong> ${data.privacy.vpn ? 'Sim' : 'Não'}</p>
        <p><strong>Proxy:</strong> ${data.privacy.proxy ? 'Sim' : 'Não'}</p>
        <p><strong>TOR:</strong> ${data.privacy.tor ? 'Sim' : 'Não'}</p>
        <p><strong>Hosting:</strong> ${data.privacy.hosting ? 'Sim' : 'Não'}</p>
        <p><strong>Serviço:</strong> ${data.privacy.service}</p>
      `;
      outputElement.innerHTML += privacyData;
    }

    if (data.abuse) {
      const abuseData = `
        <h4>Abuso</h4>
        <p><strong>Endereço de Abuso:</strong> ${data.abuse.address}</p>
        <p><strong>País:</strong> ${data.abuse.country}</p>
        <p><strong>Email:</strong> ${data.abuse.email}</p>
        <p><strong>Telefone:</strong> ${data.abuse.phone}</p>
      `;
      outputElement.innerHTML += abuseData;
    }

  } catch (error) {
    errorElement.innerHTML = 'Falha na consulta do IP';
    console.error(error);
  }
});
