const btn = document.getElementById("btn");
const estados = document.getElementById("estados");
const cidades = document.getElementById("cidades");

let data;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  carregarEstados();
});

const filtrarEstadoPorSigla = (sigla) => {
  return data.filter((estados) => {
    return estados.sigla == sigla;
  });
};

const carregarEstados = async () => {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
  );
  data = await response.json();
  preencherSelectEstados(data);

  return data;
};

const preencherSelectEstados = (data) => {
  limparSelect("estados");
  for (let i in data) {
    const { id, nome, sigla } = data[i];

    const opcoes = document.createElement("option");
    opcoes.value = id;
    opcoes.innerHTML = ` ${nome} - ${sigla}`;
    estados.appendChild(opcoes);
  }
};

const limparSelect = (idCampo) => {
  const select = document.getElementById(idCampo);
  while (select.length > 1) {
    select.remove(1);
  }
};

const carregarMunicipios = async () => {
   
  const estado_index = estados.selectedIndex;
  limparSelect("cidades");
  const estado_id =  estados.options[estado_index].value;
  
  if(estado_index === 0 || estado_id === 0){
    alert('operação cancelada')
    return
  }

  const resultado = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado_id}/municipios`
  );
  const data = await resultado.json();
  preencherSelectMunicipios(data);
  return data;
};

const preencherSelectMunicipios = (data) => {
  for (let i in data) {
    const { id, nome} = data[i];
    const option = document.createElement("option");
    option.value = id;
    option.innerHTML = ` ${nome}`;
    cidades.appendChild(option);
  }
};
