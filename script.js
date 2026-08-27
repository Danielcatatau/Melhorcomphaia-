// Banco de dados simulado (LocalStorage)
const initialProfiles = [
  {
    id: 1,
    nome: "Camila Silva",
    idade: 24,
    cidade: "São Paulo, SP",
    genero: "Mulheres",
    valor: 250,
    whatsapp: "5511999998888",
    local: "Com Local",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    descricao: "Atendimento completo, discreto e carinhoso. Atendo em local próprio no Jardins ou a domicílio/hotéis.",
    verificado: true
  },
  {
    id: 2,
    nome: "Juliana Santos",
    idade: 27,
    cidade: "Rio de Janeiro, RJ",
    genero: "Mulheres",
    valor: 300,
    whatsapp: "5521988887777",
    local: "A Domicílio",
    foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    descricao: "Acompanhante de alto nível para eventos, jantares e momentos especiais em Copacabana e Barra da Tijuca.",
    verificado: true
  },
  {
    id: 3,
    nome: "Lucas Mendes",
    idade: 26,
    cidade: "Belo Horizonte, MG",
    genero: "Homens",
    valor: 200,
    whatsapp: "5531977776666",
    local: "Com Local",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    descricao: "Atencioso, educado e discreto. Atendimento para homens, mulheres e casais.",
    verificado: true
  },
  {
    id: 4,
    nome: "Brenda Ferraz",
    idade: 23,
    cidade: "Curitiba, PR",
    genero: "Trans",
    valor: 220,
    whatsapp: "5541966665555",
    local: "Motéis",
    foto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    descricao: "Modelo trans extremamente feminina e simpática. Atendimento exclusivo em motéis e hotéis de alto padrão.",
    verificado: true
  }
];

// Inicializar Dados
function getProfiles() {
  const stored = localStorage.getItem('melhor_companhia_profiles');
  if (!stored) {
    localStorage.setItem('melhor_companhia_profiles', JSON.stringify(initialProfiles));
    return initialProfiles;
  }
  return JSON.parse(stored);
}

// Renderizar Cards na Home
function renderProfiles(profilesToRender) {
  const grid = document.getElementById('profilesGrid');
  const countSpan = document.getElementById('profileCount');
  
  if (!grid) return;
  grid.innerHTML = '';

  const profiles = profilesToRender || getProfiles();
  if (countSpan) countSpan.innerText = profiles.length;

  if (profiles.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-500">
        <i class="fa-solid fa-magnifying-glass text-4xl mb-3"></i>
        <p class="text-lg">Nenhum acompanhante encontrado para essa busca.</p>
      </div>
    `;
    return;
  }

  profiles.forEach(p => {
    const card = document.createElement('div');
    card.className = "profile-card bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-rose-600 shadow-xl flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="relative h-72 bg-slate-800 overflow-hidden">
          <img src="${p.foto}" alt="${p.nome}" class="w-full h-full object-cover">
          ${p.verificado ? '<span class="absolute top-3 right-3 bg-emerald-500/90 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full shadow backdrop-blur flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> Verificado</span>' : ''}
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-4 flex justify-between items-end">
            <div>
              <h3 class="text-lg font-bold text-white leading-tight">${p.nome}, ${p.idade}</h3>
              <p class="text-xs text-slate-300 flex items-center gap-1"><i class="fa-solid fa-location-dot text-rose-500"></i> ${p.cidade}</p>
            </div>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span class="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">${p.genero}</span>
            <span class="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">${p.local}</span>
          </div>
          <p class="text-xs text-slate-400 line-clamp-2">${p.descricao}</p>
        </div>
      </div>
      <div class="p-4 pt-0 flex justify-between items-center mt-2">
        <div>
          <span class="text-xs text-slate-500 block">A partir de</span>
          <span class="text-rose-500 font-extrabold text-lg">R$ ${p.valor} <span class="text-xs text-slate-400 font-normal">/h</span></span>
        </div>
        <a href="perfil.html?id=${p.id}" class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shadow-md shadow-rose-600/20 flex items-center gap-1">
          Ver Perfil <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filtro de Busca
const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('searchCity').value.toLowerCase();
    const gender = document.getElementById('searchGender').value;
    const type = document.getElementById('searchType').value;

    const all = getProfiles();
    const filtered = all.filter(p => {
      const matchCity = !city || p.cidade.toLowerCase().includes(city);
      const matchGender = !gender || p.genero === gender;
      const matchType = !type || p.local === type;
      return matchCity && matchGender && matchType;
    });

    renderProfiles(filtered);
  });
}

// Detalhes do Perfil
function loadProfileDetail() {
  const container = document.getElementById('profileDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id')) || 1;

  const profiles = getProfiles();
  const p = profiles.find(item => item.id === id) || profiles[0];

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl text-center space-y-4">
          <img src="${p.foto}" alt="${p.nome}" class="w-full h-96 object-cover rounded-xl shadow">
          <div>
            <h1 class="text-2xl font-black text-white">${p.nome}, ${p.idade}</h1>
            <p class="text-slate-400 text-sm"><i class="fa-solid fa-location-dot text-rose-500"></i> ${p.cidade}</p>
          </div>
          <div class="text-2xl font-black text-rose-500">
            R$ ${p.valor} <span class="text-xs text-slate-400 font-normal">/ hora</span>
          </div>
          <a href="https://wa.me/${p.whatsapp}?text=Olá%20${encodeURIComponent(p.nome)},%20vi%20seu%20anúncio%20no%20Melhor%20Companhia!" target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/20">
            <i class="fa-brands fa-whatsapp text-lg"></i> Chamar no WhatsApp
          </a>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 class="text-lg font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <i class="fa-solid fa-user-check text-rose-500"></i> Sobre o Acompanhante
          </h2>
          <p class="text-slate-300 text-sm leading-relaxed">${p.descricao}</p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div class="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-500 block">Gênero</span>
              <span class="text-sm font-bold text-white">${p.genero}</span>
            </div>
            <div class="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-500 block">Local</span>
              <span class="text-sm font-bold text-white">${p.local}</span>
            </div>
            <div class="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-500 block">Status</span>
              <span class="text-sm font-bold text-emerald-400">Verificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Cadastro de Perfil
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
  cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const profiles = getProfiles();

    const newProfile = {
      id: Date.now(),
      nome: document.getElementById('cadNome').value,
      idade: parseInt(document.getElementById('cadIdade').value),
      genero: document.getElementById('cadGenero').value,
      cidade: document.getElementById('cadCidade').value,
      valor: parseFloat(document.getElementById('cadValor').value),
      whatsapp: document.getElementById('cadWhatsapp').value,
      local: document.getElementById('cadLocal').value,
      foto: document.getElementById('cadFoto').value,
      descricao: document.getElementById('cadDescricao').value,
      verificado: true
    };

    profiles.unshift(newProfile);
    localStorage.setItem('melhor_companhia_profiles', JSON.stringify(profiles));

    alert('Anúncio cadastrado com sucesso!');
    window.location.href = 'index.html';
  });
}

// Execução Inicial
document.addEventListener('DOMContentLoaded', () => {
  renderProfiles();
});
