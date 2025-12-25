// ============================================
// CLÍNICA BICHO LEGAL - SCRIPT PRINCIPAL
// ============================================

// ===== CONFIGURAÇÕES INICIAIS =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Clínica Bicho Legal - Script inicializado');

    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===== FAQ - ACORDEÃO =====
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');
    
    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const item = pergunta.parentElement;
            const resposta = pergunta.nextElementSibling;
            const icone = pergunta.querySelector('i');
            
            // Fechar outros itens abertos
            document.querySelectorAll('.faq-item').forEach(outroItem => {
                if (outroItem !== item && outroItem.classList.contains('active')) {
                    outroItem.classList.remove('active');
                    outroItem.querySelector('.faq-resposta').style.maxHeight = null;
                    outroItem.querySelector('.faq-pergunta i').classList.remove('fa-chevron-up');
                    outroItem.querySelector('.faq-pergunta i').classList.add('fa-chevron-down');
                }
            });
            
            // Alternar item atual
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
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
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const produtoCards = document.querySelectorAll('.produto-card');
    
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            categoriaBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar produtos
            produtoCards.forEach(card => {
                const cardCategoria = card.getAttribute('data-categoria');
                
                if (categoria === 'todos' || categoria === cardCategoria) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

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
            
            // Desabilitar sábados e domingos
            dataInput.addEventListener('change', function() {
                const dataSelecionada = new Date(this.value);
                const diaSemana = dataSelecionada.getDay();
                
                if (diaSemana === 0 || diaSemana === 6) {
                    alert('A clínica não funciona aos sábados e domingos para agendamentos. Por favor, selecione uma data de segunda a sexta.');
                    this.value = '';
                }
            });
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
                // Em um caso real, aqui seria uma requisição AJAX
                alert('Agendamento enviado com sucesso! Entraremos em contato em até 2 horas úteis para confirmar.');
                formAgendamento.reset();
                
                botaoEnviar.innerHTML = textoOriginal;
                botaoEnviar.disabled = false;
                
                // Rolar para o topo da seção
                document.getElementById('agendamento').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1500);
        });
    }

    // ===== BOTÕES DE COMPRA =====
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', function() {
            const produtoCard = this.closest('.produto-card');
            const produtoNome = produtoCard.querySelector('h3').textContent;
            const produtoPreco = produtoCard.querySelector('.preco-atual').textContent;
            
            // Montar mensagem para WhatsApp
            const mensagem = `Olá! Gostaria de comprar o produto: ${produtoNome} por ${produtoPreco}. Pode me ajudar?`;
            const numeroWhatsApp = '5592999999999';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
            
            // Abrir WhatsApp em nova aba
            window.open(urlWhatsApp, '_blank');
            
            // Animação de feedback
            this.innerHTML = '<i class="fas fa-check"></i> Adicionado';
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Comprar';
                this.classList.remove('btn-success');
            }, 2000);
        });
    });

    // ===== SCROLL SUAVE =====
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Atualizar URL sem recarregar a página
                history.pushState(null, null, href);
            }
        });
    });

    // ===== ANIMAÇÃO DE CONTAGEM PARA ESTATÍSTICAS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const valorFinal = stat.textContent;
                    
                    // Verificar se é um número válido para animar
                    if (valorFinal.match(/^\d+\+?$/)) {
                        const numeroLimpo = parseInt(valorFinal);
                        if (!isNaN(numeroLimpo)) {
                            animarContagem(stat, numeroLimpo);
                        }
                    }
                });
                observer.disconnect(); // Parar de observar após animar
            }
        });
    }, observerOptions);
    
    const sobreStats = document.querySelector('.sobre-stats');
    if (sobreStats) {
        observer.observe(sobreStats);
    }
    
    function animarContagem(elemento, valorFinal) {
        let contador = 0;
        const incremento = valorFinal / 50; // Duração de 1 segundo (50 frames a 20ms)
        const duracao = 1000; // 1 segundo
        
        const timer = setInterval(() => {
            contador += incremento;
            if (contador >= valorFinal) {
                contador = valorFinal;
                clearInterval(timer);
            }
            elemento.textContent = Math.floor(contador) + (elemento.textContent.includes('+') ? '+' : '');
        }, duracao / 50);
    }

    // ===== HEADER COM SCROLL =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = '';
            header.style.backdropFilter = '';
            header.style.boxShadow = '';
        }
    });

    // ===== VALIDAÇÃO EM TEMPO REAL DOS FORMULÁRIOS =====
    const inputsForm = document.querySelectorAll('input, textarea, select');
    
    inputsForm.forEach(input => {
        // Evento de foco
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Evento de blur
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Validação básica
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.parentElement.classList.add('error');
            } else {
                this.parentElement.classList.remove('error');
            }
        });
    });

    // ===== ATUALIZAR ANO NO FOOTER =====
    const anoAtual = new Date().getFullYear();
    const elementosAno = document.querySelectorAll('.current-year');
    
    elementosAno.forEach(elemento => {
        elemento.textContent = anoAtual;
    });

    // ===== MODAL DE CONFIRMAÇÃO PARA BOTÕES IMPORTANTES =====
    const botoesImportantes = document.querySelectorAll('.btn-whatsapp, .btn-secondary[href*="tel"]');
    
    botoesImportantes.forEach(botao => {
        botao.addEventListener('click', function(e) {
            // Se já tem target _blank, não fazer nada
            if (this.getAttribute('target') === '_blank') return;
            
            const href = this.getAttribute('href');
            if (href && (href.includes('tel:') || href.includes('mailto:'))) {
                // Permitir ação padrão para tel e mailto
                return;
            }
            
            // Para outros botões, podemos adicionar confirmação
            if (!this.classList.contains('no-confirm')) {
                if (!confirm('Você será redirecionado para fora do site. Deseja continuar?')) {
                    e.preventDefault();
                }
            }
        });
    });

    // ===== CARREGAMENTO DINÂMICO DE IMAGENS =====
    const imagens = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imgObserver.unobserve(img);
                }
            });
        });
        
        imagens.forEach(img => imgObserver.observe(img));
    } else {
        // Fallback para navegadores antigos
        imagens.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }

    // ===== NOTIFICAÇÃO DE VISITANTE =====
    setTimeout(() => {
        if (!localStorage.getItem('notificacaoMostrada')) {
            const notificacao = document.createElement('div');
            notificacao.className = 'notificacao-flutuante';
            notificacao.innerHTML = `
                <div class="notificacao-conteudo">
                    <i class="fas fa-paw"></i>
                    <div>
                        <strong>Bem-vindo à Clínica Bicho Legal!</strong>
                        <p>Atendimento 24h para emergências.</p>
                    </div>
                    <button class="notificacao-fechar">&times;</button>
                </div>
            `;
            
            document.body.appendChild(notificacao);
            
            // Estilos dinâmicos para a notificação
            notificacao.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                z-index: 9999;
                max-width: 350px;
                animation: slideInRight 0.5s ease;
            `;
            
            notificacao.querySelector('.notificacao-fechar').addEventListener('click', () => {
                notificacao.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => {
                    notificacao.remove();
                }, 500);
                localStorage.setItem('notificacaoMostrada', 'true');
            });
            
            // Remover automaticamente após 10 segundos
            setTimeout(() => {
                if (notificacao.parentNode) {
                    notificacao.style.animation = 'slideOutRight 0.5s ease';
                    setTimeout(() => {
                        notificacao.remove();
                    }, 500);
                }
            }, 10000);
            
            // Adicionar keyframes CSS para animação
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }, 2000);

    // ===== BOTÃO VOLTAR AO TOPO =====
    const criarBotaoTopo = () => {
        const botaoTopo = document.createElement('button');
        botaoTopo.className = 'btn-topo';
        botaoTopo.innerHTML = '<i class="fas fa-chevron-up"></i>';
        botaoTopo.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(botaoTopo);
        
        // Estilos do botão
        botaoTopo.style.cssText = `
            position: fixed;
            bottom: 100px;
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
                setTimeout(() => {
                    botaoTopo.style.opacity = '1';
                    botaoTopo.style.transform = 'translateY(0)';
                }, 10);
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
        
        // Efeito hover
        botaoTopo.addEventListener('mouseenter', () => {
            botaoTopo.style.transform = 'translateY(-5px)';
            botaoTopo.style.boxShadow = '0 8px 20px rgba(255, 107, 53, 0.4)';
        });
        
        botaoTopo.addEventListener('mouseleave', () => {
            botaoTopo.style.transform = 'translateY(0)';
            botaoTopo.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
        });
    };
    
    criarBotaoTopo();

    // ===== INICIALIZAÇÃO FINAL =====
    console.log('Todos os scripts foram carregados com sucesso!');
});

// ===== FUNÇÕES GLOBAIS ÚTEIS =====

// Função para formatar números brasileiros
function formatarNumeroBR(numero) {
    return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar telefone brasileiro
function validarTelefoneBR(telefone) {
    const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
}

// Função para mostrar mensagem de sucesso/erro
function mostrarMensagem(tipo, mensagem, duracao = 3000) {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = `mensagem-flutuante mensagem-${tipo}`;
    mensagemDiv.textContent = mensagem;
    
    // Estilos
    mensagemDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInTop 0.5s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    `;
    
    if (tipo === 'sucesso') {
        mensagemDiv.style.background = '#06D6A0';
    } else if (tipo === 'erro') {
        mensagemDiv.style.background = '#EF476F';
    } else if (tipo === 'info') {
        mensagemDiv.style.background = '#118AB2';
    }
    
    document.body.appendChild(mensagemDiv);
    
    // Remover após duração
    setTimeout(() => {
        mensagemDiv.style.animation = 'slideOutTop 0.5s ease';
        setTimeout(() => {
            mensagemDiv.remove();
        }, 500);
    }, duracao);
    
    // Adicionar keyframes se necessário
    if (!document.querySelector('#mensagem-animations')) {
        const style = document.createElement('style');
        style.id = 'mensagem-animations';
        style.textContent = `
            @keyframes slideInTop {
                from { transform: translateY(-100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideOutTop {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(-100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== DETECÇÃO DE DISPOSITIVO =====
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 992;
}

function isDesktop() {
    return window.innerWidth > 992;
}

// ===== OBSERVADOR DE MUDANÇA DE TAMANHO DE TELA =====
let timeoutResize;
window.addEventListener('resize', () => {
    clearTimeout(timeoutResize);
    timeoutResize = setTimeout(() => {
        // Ações quando a tela é redimensionada
        console.log(`Tamanho da tela: ${window.innerWidth}x${window.innerHeight}`);
    }, 250);
});