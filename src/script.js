// ===== FILTRO DE PRODUTOS - CORRIGIDO =====
function inicializarFiltroProdutos() {
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const produtoCards = document.querySelectorAll('.produto-card');
    
    // Função para filtrar produtos
    function filtrarProdutos(categoria) {
        produtoCards.forEach(card => {
            const cardCategoria = card.getAttribute('data-categoria');
            
            // Remove todas as classes ativas dos cards
            card.classList.remove('active');
            
            if (categoria === 'todos' || categoria === cardCategoria) {
                card.style.display = 'block';
                // Adiciona pequeno delay para animação
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Configurar evento de clique nos botões
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove classe active de todos os botões
            categoriaBtns.forEach(b => b.classList.remove('active'));
            
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            filtrarProdutos(categoria);
        });
    });
    
    // Filtrar automaticamente na inicialização baseado no botão ativo
    const btnAtivo = document.querySelector('.categoria-btn.active');
    if (btnAtivo) {
        const categoriaAtiva = btnAtivo.getAttribute('data-categoria');
        filtrarProdutos(categoriaAtiva);
    } else {
        // Se nenhum botão estiver ativo, mostrar todos os produtos
        filtrarProdutos('todos');
    }
}

// ===== ATUALIZAR O EVENT LISTENER =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Clínica Bicho Legal - Script inicializado');

    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            // Troca o ícone
            if (isActive) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ===== FAQ - ACORDEÃO =====
    document.querySelectorAll('.faq-pergunta').forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const faqItem = pergunta.parentElement;
            const resposta = pergunta.nextElementSibling;
            const icone = pergunta.querySelector('i');
            
            // Fecha outros itens
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-resposta').style.maxHeight = null;
                    item.querySelector('i').classList.remove('fa-chevron-up');
                    item.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // Alterna item atual
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                resposta.style.maxHeight = resposta.scrollHeight + 'px';
                icone.classList.remove('fa-chevron-down');
                icone.classList.add('fa-chevron-up');
            } else {
                resposta.style.maxHeight = null;
                icone.classList.remove('fa-chevron-up');
                icone.classList.add('fa-chevron-down');
            }
        });
    });

    // ===== FILTRO DE PRODUTOS =====
    inicializarFiltroProdutos();

    // ===== FORMULÁRIO DE AGENDAMENTO =====
    const formAgendamento = document.getElementById('form-agendamento');
    
    if (formAgendamento) {
        // Configurar data mínima para amanhã
        const dataInput = document.getElementById('data');
        if (dataInput) {
            const hoje = new Date();
            const amanha = new Date(hoje);
            amanha.setDate(hoje.getDate() + 1);
            dataInput.min = amanha.toISOString().split('T')[0];
        }
        
        // Máscara para telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function(e) {
                let valor = e.target.value.replace(/\D/g, '');
                
                if (valor.length > 11) {
                    valor = valor.substring(0, 11);
                }
                
                if (valor.length > 10) {
                    e.target.value = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
                } else if (valor.length > 6) {
                    e.target.value = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
                } else if (valor.length > 2) {
                    e.target.value = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    e.target.value = valor.replace(/^(\d*)/, '($1');
                }
            });
        }
        
        // Envio do formulário
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const camposObrigatorios = this.querySelectorAll('[required]');
            let valido = true;
            
            camposObrigatorios.forEach(campo => {
                if (!campo.value.trim()) {
                    campo.style.borderColor = '#EF476F';
                    valido = false;
                } else {
                    campo.style.borderColor = '';
                }
            });
            
            if (!valido) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simular envio
            const botaoEnviar = this.querySelector('button[type="submit"]');
            const textoOriginal = botaoEnviar.innerHTML;
            
            botaoEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botaoEnviar.disabled = true;
            
            setTimeout(() => {
                // Sucesso!
                alert('Agendamento enviado com sucesso! Entraremos em contato em até 2 horas úteis para confirmar.');
                formAgendamento.reset();
                
                botaoEnviar.innerHTML = textoOriginal;
                botaoEnviar.disabled = false;
                
                // Rolar para o topo
                document.getElementById('agendamento').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1500);
        });
    }

    // ===== BOTÕES DE COMPRA =====
    document.querySelectorAll('.btn-comprar').forEach(botao => {
        botao.addEventListener('click', function() {
            const produtoCard = this.closest('.produto-card');
            const produtoNome = produtoCard.querySelector('h3').textContent;
            const produtoPreco = produtoCard.querySelector('.preco-atual').textContent;
            
            // Montar mensagem para WhatsApp
            const mensagem = `Olá! Gostaria de comprar o produto: ${produtoNome} por ${produtoPreco}. Pode me ajudar?`;
            const numeroWhatsApp = '5592999999999';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
            
            // Abrir WhatsApp
            window.open(urlWhatsApp, '_blank');
            
            // Feedback visual
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Adicionado';
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('btn-success');
            }, 2000);
        });
    });

    // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#inicio') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMAÇÃO DE CONTAGEM PARA ESTATÍSTICAS =====
    function animarEstatisticas() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const valorFinal = stat.textContent;
            
            // Verificar se é um número válido
            if (valorFinal.match(/^\d+\+?$/)) {
                const numero = parseInt(valorFinal);
                if (!isNaN(numero)) {
                    let contador = 0;
                    const incremento = numero / 50;
                    const duracao = 1000;
                    
                    const timer = setInterval(() => {
                        contador += incremento;
                        if (contador >= numero) {
                            contador = numero;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(contador) + (valorFinal.includes('+') ? '+' : '');
                    }, duracao / 50);
                }
            }
        });
    }
    
    // Observar quando as estatísticas entram na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarEstatisticas();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const sobreStats = document.querySelector('.sobre-stats');
    if (sobreStats) {
        observer.observe(sobreStats);
    }

    // ===== HEADER COM EFEITO DE SCROLL =====
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== BOTÃO VOLTAR AO TOPO =====
    function criarBotaoTopo() {
        const botaoTopo = document.createElement('button');
        botaoTopo.className = 'btn-topo';
        botaoTopo.innerHTML = '<i class="fas fa-chevron-up"></i>';
        botaoTopo.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(botaoTopo);
        
        // Estilos básicos
        botaoTopo.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--orange);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            z-index: 999;
            transition: all 0.3s ease;
        `;
        
        // Mostrar/ocultar botão
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                botaoTopo.style.display = 'flex';
                botaoTopo.style.opacity = '1';
                botaoTopo.style.transform = 'translateY(0)';
            } else {
                botaoTopo.style.opacity = '0';
                botaoTopo.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    botaoTopo.style.display = 'none';
                }, 300);
            }
        });
        
        // Ação do botão
        botaoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    criarBotaoTopo();

    // ===== VALIDAÇÃO EM TEMPO REAL =====
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#EF476F';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--blue)';
        });
    });

    // ===== ATUALIZAR ANO NO FOOTER =====
    const anoAtual = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(elemento => {
        elemento.textContent = anoAtual;
    });

    // ===== DETECÇÃO DE DISPOSITIVO =====
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Ajustes para mobile
    if (isMobile()) {
        // Remover animações complexas em mobile
        document.querySelectorAll('.servico-card').forEach(card => {
            card.style.animation = 'none';
            card.style.opacity = '1';
        });
    }

    console.log('Script carregado com sucesso!');
});