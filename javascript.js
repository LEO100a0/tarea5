        // Función para agregar productos al carrito
        function agregarAlCarrito(nombre, precio) {
            alert(`Agregaste ${nombre} al carrito. Precio: $${precio}`);
        }

        // Función para ocultar todas las secciones
        function ocultarTodasLasSecciones() {
            document.getElementById('productos-section').style.display = 'none';
            document.getElementById('contacto-section').style.display = 'none';
            document.getElementById('ubicanos-section').style.display = 'none';
            document.getElementById('torneo-section').style.display = 'none';
            document.getElementById('game-section').style.display = 'none';
            document.getElementById('about-section').style.display = 'none';
        }

        // Mostrar catálogo (productos)
        document.getElementById('catalogo-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('productos-section').style.display = 'flex';
        });

        // Mostrar contacto
        document.getElementById('contacto-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('contacto-section').style.display = 'block';
        });

        // Mostrar ubicación
        document.getElementById('ubicanos-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('ubicanos-section').style.display = 'block';
        });

        // Mostrar torneo
        document.getElementById('torneo-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('torneo-section').style.display = 'block';
        });

        // Mostrar juego
        document.getElementById('game-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('game-section').style.display = 'block';
            initGameSection();
        });

        // Mostrar about
        document.getElementById('about-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('about-section').style.display = 'block';
        });

        // Barra azul - mostrar ubicación
        document.getElementById('barra-azul-link').addEventListener('click', function(e) {
            e.preventDefault();
            ocultarTodasLasSecciones();
            document.getElementById('ubicanos-section').style.display = 'block';
        });

        // Manejar el formulario de inscripción al torneo (versión mejorada)
        document.getElementById('formInscripcion').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ocultar todos los mensajes de error inicialmente
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            
            // Validar todos los campos
            const torneoValido = validarTorneo();
            const correoValido = validarCorreo();
            const nombreValido = validarNombre();
            const validacionEdad = validarEdad(); // Devuelve {valido: boolean, edad: number}
            const validacionPago = validarPago(); // Devuelve {valido: boolean, vuelto?: number}
            
            if (torneoValido && correoValido && nombreValido && validacionEdad.valido && validacionPago.valido) {
                // Datos para el modal
                const torneoSeleccionado = document.querySelector('#selectTorneo option:checked');
                const precioTorneo = parseFloat(torneoSeleccionado.dataset.precio);
                const montoPagado = parseFloat(document.getElementById('pago').value);
                
                // Mostrar modal de éxito
                mostrarModal(
                    '¡Inscripción exitosa!',
                    '<div class="success-message">Te has inscrito correctamente al torneo.</div>',
                    `Detalles de la inscripción:<br><br>
                    <strong>Torneo:</strong> ${torneoSeleccionado.textContent}<br>
                    <strong>Edad del participante:</strong> ${validacionEdad.edad} años<br>
                    <strong>Monto pagado:</strong> S/${montoPagado.toFixed(2)}<br>
                    <strong>Costo del torneo:</strong> S/${precioTorneo.toFixed(2)}<br>
                    <strong>Vuelto:</strong> S/${validacionPago.vuelto.toFixed(2)}`
                );
            } else {
                // Construir mensaje de error detallado
                let detallesError = [];
                
                if (!torneoValido) detallesError.push('- Debes seleccionar un torneo');
                if (!correoValido) detallesError.push('- Ingresa un correo electrónico válido');
                if (!nombreValido) detallesError.push('- Ingresa tu nombre completo');
                if (!validacionEdad.valido) detallesError.push('- Debes tener al menos 14 años para inscribirte');
                if (!validacionPago.valido) detallesError.push('- El monto ingresado es insuficiente');
                
                // Mostrar modal de error
                mostrarModal(
                    'Error en la inscripción',
                    'No se pudo completar la inscripción. Por favor verifica lo siguiente:',
                    detallesError.join('<br>')
                );
            }
        });

        // Validar selección de torneo
        function validarTorneo() {
            const torneoSelect = document.getElementById('selectTorneo');
            
            if (torneoSelect.value === '') {
                torneoSelect.classList.add('input-error');
                document.getElementById('torneo-error').style.display = 'block';
                return false;
            }
            return true;
        }

        // Validar correo electrónico
        function validarCorreo() {
            const correoInput = document.getElementById('correo');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(correoInput.value)) {
                correoInput.classList.add('input-error');
                document.getElementById('correo-error').style.display = 'block';
                return false;
            }
            return true;
        }

        // Validar nombre completo
        function validarNombre() {
            const nombreInput = document.getElementById('nombre');
            
            if (nombreInput.value.trim() === '') {
                nombreInput.classList.add('input-error');
                document.getElementById('nombre-error').style.display = 'block';
                return false;
            }
            return true;
        }

        // Validar edad (mínimo 14 años) - Devuelve objeto con validez y edad
        function validarEdad() {
            const fechaInput = document.getElementById('fechaNacimiento');
            
            if (fechaInput.value === '') {
                fechaInput.classList.add('input-error');
                return { valido: false, edad: 0 };
            }
            
            const fechaNacimiento = new Date(fechaInput.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            
            if (edad < 14) {
                fechaInput.classList.add('input-error');
                document.getElementById('edad-error').style.display = 'block';
                return { valido: false, edad: edad };
            }
            return { valido: true, edad: edad };
        }

        // Validar pago - Devuelve objeto con validez y vuelto
        function validarPago() {
            const pagoInput = document.getElementById('pago');
            
            if (pagoInput.value === '' || parseFloat(pagoInput.value) <= 0) {
                pagoInput.classList.add('input-error');
                document.getElementById('pago-error').style.display = 'block';
                return { valido: false };
            }
            
            const torneoSelect = document.getElementById('selectTorneo');
            if (torneoSelect.value === '') {
                return { valido: false };
            }
            
            const precioTorneo = parseFloat(torneoSelect.options[torneoSelect.selectedIndex].dataset.precio);
            const montoPagado = parseFloat(pagoInput.value);
            
            if (montoPagado < precioTorneo) {
                pagoInput.classList.add('input-error');
                document.getElementById('pago-error').style.display = 'block';
                return { valido: false };
            }
            return { valido: true, vuelto: montoPagado - precioTorneo };
        }

        // Mostrar modal con resultados
        function mostrarModal(titulo, mensaje, detalles) {
            document.getElementById('modal-title').textContent = titulo;
            document.getElementById('modal-message').innerHTML = mensaje;
            document.getElementById('modal-details').innerHTML = detalles || '';
            
            const modal = document.getElementById('resultModal');
            modal.style.display = 'block';
            
            // Cerrar modal al hacer clic en la X
            document.querySelector('.close-modal').onclick = function() {
                modal.style.display = 'none';
            }
            
            // Cerrar modal al hacer clic fuera del contenido
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        }

        // Event listeners para limpiar errores al editar
        document.getElementById('fechaNacimiento').addEventListener('change', function() {
            this.classList.remove('input-error');
            document.getElementById('edad-error').style.display = 'none';
        });
        
        document.getElementById('pago').addEventListener('input', function() {
            this.classList.remove('input-error');
            document.getElementById('pago-error').style.display = 'none';
        });

        // ============================================
        // Código del juego Garbage Collector
        // ============================================
        
        // Variables del juego
        let gameActive = false;
        let gameTimer;
        let timeLeft = 60;
        let score = 0;
        let currentLevel = 1;
        let trashRequired = 10;
        let trashItems = [];
        let playerX, playerY;
        let playerSpeed = 5;
        let isMobile = false;
        let joystickActive = false;
        let joystickBaseX = 0, joystickBaseY = 0;
        let joystickCenterX = 0, joystickCenterY = 0;
        let joystickRadius = 0;
        
        // Estado de las teclas
        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };

        // Inicializar el juego cuando se muestra la sección
        function initGameSection() {
            const gameArea = document.getElementById('gameArea');
            const player = document.getElementById('player');
            
            // Reiniciar variables
            gameActive = false;
            clearInterval(gameTimer);
            
            // Calcular dimensiones correctas ahora que la sección es visible
            const gameAreaWidth = gameArea.offsetWidth;
            const gameAreaHeight = gameArea.offsetHeight;
            
            // Posición inicial del jugador
            playerX = gameAreaWidth / 2 - 20;
            playerY = gameAreaHeight / 2 - 20;
            player.style.left = playerX + 'px';
            player.style.top = playerY + 'px';
            
            // Inicializar joystick para móviles
            initJoystick();
            
            // Configurar botones
            document.getElementById('startBtn').onclick = startGame;
            document.getElementById('restartBtn').onclick = startGame;
            
            // Mostrar estado inicial
            updateGameStats();
        }

        function startGame() {
            const gameArea = document.getElementById('gameArea');
            const player = document.getElementById('player');
            const gameOverScreen = document.getElementById('gameOver');
            
            // Resetear variables
            score = 0;
            currentLevel = 1;
            timeLeft = 60;
            trashRequired = 10;
            gameActive = true;
            
            // Limpiar basura existente
            document.querySelectorAll('.trash').forEach(trash => trash.remove());
            trashItems = [];
            
            // Posicionar jugador
            const gameAreaWidth = gameArea.offsetWidth;
            const gameAreaHeight = gameArea.offsetHeight;
            playerX = gameAreaWidth / 2 - 20;
            playerY = gameAreaHeight / 2 - 20;
            player.style.left = playerX + 'px';
            player.style.top = playerY + 'px';
            
            // Ocultar pantalla de fin de juego
            gameOverScreen.style.display = 'none';
            
            // Crear basura inicial
            createTrash(trashRequired + 5);
            
            // Actualizar estadísticas
            updateGameStats();
            
            // Iniciar temporizador
            clearInterval(gameTimer);
            gameTimer = setInterval(updateTimer, 1000);
            
            // Iniciar bucle de movimiento
            updatePlayerPosition();
        }

        function updateGameStats() {
            document.getElementById('score').textContent = `${score}/${trashRequired}`;
            document.getElementById('timer').textContent = `${timeLeft}s`;
            document.getElementById('level').textContent = `${currentLevel}`;
        }

        function updateTimer() {
            timeLeft--;
            document.getElementById('timer').textContent = `${timeLeft}s`;
            
            if (timeLeft <= 0) {
                endGame(false);
            }
        }

        function updatePlayerPosition() {
            if (!gameActive) return;
            
            // Calcular nueva posición basada en las teclas o joystick
            if (keys.ArrowUp) playerY -= playerSpeed;
            if (keys.ArrowDown) playerY += playerSpeed;
            if (keys.ArrowLeft) playerX -= playerSpeed;
            if (keys.ArrowRight) playerX += playerSpeed;
            
            // Limitar al área de juego
            const gameArea = document.getElementById('gameArea');
            const gameAreaWidth = gameArea.offsetWidth;
            const gameAreaHeight = gameArea.offsetHeight;
            
            playerX = Math.max(0, Math.min(gameAreaWidth - 40, playerX));
            playerY = Math.max(0, Math.min(gameAreaHeight - 40, playerY));
            
            // Actualizar posición
            const player = document.getElementById('player');
            player.style.left = playerX + 'px';
            player.style.top = playerY + 'px';
            
            // Verificar colisión con basura
            checkTrashCollision();
            
            // Continuar el bucle de animación
            if (gameActive) {
                requestAnimationFrame(updatePlayerPosition);
            }
        }

        function createTrash(num) {
            const trashEmojis = ['🍂', '🥤', '🧃', '📄'];
            const gameArea = document.getElementById('gameArea');
            const gameAreaWidth = gameArea.offsetWidth;
            const gameAreaHeight = gameArea.offsetHeight;
            
            for (let i = 0; i < num; i++) {
                const trash = document.createElement('div');
                trash.className = 'trash';
                
                // Posición aleatoria dentro del área de juego
                const trashX = Math.random() * (gameAreaWidth - 30);
                const trashY = Math.random() * (gameAreaHeight - 30);
                
                trash.style.left = trashX + 'px';
                trash.style.top = trashY + 'px';
                
                // Asignar emoji aleatorio de basura
                trash.textContent = trashEmojis[Math.floor(Math.random() * trashEmojis.length)];
                
                gameArea.appendChild(trash);
                trashItems.push({
                    element: trash,
                    x: trashX,
                    y: trashY,
                    collected: false
                });
            }
        }

        function checkTrashCollision() {
            const player = document.getElementById('player');
            const playerRect = player.getBoundingClientRect();
            
            trashItems.forEach((trash, index) => {
                if (!trash.collected) {
                    const trashRect = trash.element.getBoundingClientRect();
                    
                    // Calcular distancia entre jugador y basura
                    const dx = (playerRect.left + playerRect.width/2) - (trashRect.left + trashRect.width/2);
                    const dy = (playerRect.top + playerRect.height/2) - (trashRect.top + trashRect.height/2);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Si hay colisión (distancia menor que la suma de radios)
                    if (distance < 25) {
                        trash.collected = true;
                        trash.element.remove();
                        score++;
                        document.getElementById('score').textContent = `${score}/${trashRequired}`;
                        
                        // Verificar si se alcanzó el objetivo
                        if (score >= trashRequired) {
                            levelComplete();
                        }
                        
                        // Crear nueva basura si quedan pocas
                        const remainingTrash = trashItems.filter(t => !t.collected).length;
                        if (remainingTrash < 3) {
                            createTrash(5 - remainingTrash);
                        }
                    }
                }
            });
        }

        function levelComplete() {
            gameActive = false;
            clearInterval(gameTimer);
            
            currentLevel++;
            trashRequired = 10 + (5 * (currentLevel - 1));
            
            const resultMessage = document.getElementById('resultMessage');
            resultMessage.innerHTML = `
                <div>¡Nivel ${currentLevel - 1} completado! 🎉</div>
                <div>¡Pasas al nivel ${currentLevel}!</div>
                <div>Nuevo objetivo: ${trashRequired} piezas</div>
            `;
            document.getElementById('gameOver').style.display = 'flex';
            document.getElementById('restartBtn').textContent = 'Siguiente nivel';
        }

        function endGame(win) {
            gameActive = false;
            clearInterval(gameTimer);
            
            const resultMessage = document.getElementById('resultMessage');
            if (win) {
                resultMessage.innerHTML = '¡Felicidades! Limpiaste el campus a tiempo. 🎉';
            } else {
                resultMessage.innerHTML = `
                    <div>¡Tiempo agotado! 😞</div>
                    <div>Recogiste ${score} de ${trashRequired} piezas.</div>
                    <div>Nivel alcanzado: ${currentLevel}</div>
                `;
            }
            
            if (!win) {
                currentLevel = 1;
                document.getElementById('restartBtn').textContent = 'Intentar de nuevo';
            }
            
            document.getElementById('gameOver').style.display = 'flex';
        }

        function initJoystick() {
            isMobile = (('ontouchstart' in window) || 
                      (navigator.maxTouchPoints > 0) || 
                      (navigator.msMaxTouchPoints > 0));
            
            if (!isMobile) return;
            
            const joystickBase = document.querySelector('.joystick-base');
            const rect = joystickBase.getBoundingClientRect();
            
            joystickBaseX = rect.left;
            joystickBaseY = rect.top;
            joystickCenterX = rect.width / 2;
            joystickCenterY = rect.height / 2;
            joystickRadius = rect.width / 2;
            
            // Mostrar joystick
            document.querySelector('.joystick-container').style.display = 'block';
            
            // Eventos táctiles
            document.getElementById('joystickKnob').addEventListener('touchstart', handleJoystickStart);
            document.addEventListener('touchmove', handleJoystickMove);
            document.addEventListener('touchend', handleJoystickEnd);
        }

        function handleJoystickStart(e) {
            e.preventDefault();
            joystickActive = true;
            updatePlayerVelocity(0, 0);
        }

        function handleJoystickMove(e) {
            if (!joystickActive) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            const touchX = touch.clientX - joystickBaseX;
            const touchY = touch.clientY - joystickBaseY;
            
            // Calcular distancia desde el centro
            const distX = touchX - joystickCenterX;
            const distY = touchY - joystickCenterY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // Limitar al área del joystick
            let limitedX = distX;
            let limitedY = distY;
            
            if (distance > joystickRadius) {
                limitedX = (distX / distance) * joystickRadius;
                limitedY = (distY / distance) * joystickRadius;
            }
            
            // Mover el knob
            document.getElementById('joystickKnob').style.transform = `translate(${limitedX}px, ${limitedY}px)`;
            
            // Calcular dirección (normalizada)
            const dirX = limitedX / joystickRadius;
            const dirY = limitedY / joystickRadius;
            
            updatePlayerVelocity(dirX, dirY);
        }

        function handleJoystickEnd(e) {
            joystickActive = false;
            document.getElementById('joystickKnob').style.transform = 'translate(0, 0)';
            updatePlayerVelocity(0, 0);
        }

        function updatePlayerVelocity(dirX, dirY) {
            // Actualizar estado de movimiento basado en joystick
            keys.ArrowUp = dirY < -0.3;
            keys.ArrowDown = dirY > 0.3;
            keys.ArrowLeft = dirX < -0.3;
            keys.ArrowRight = dirX > 0.3;
        }

        // Detectar teclas presionadas (para desktop)
        document.addEventListener('keydown', (e) => {
            if (keys.hasOwnProperty(e.key)) {
                keys[e.key] = true;
                e.preventDefault();
            }
        });

        // Detectar teclas liberadas (para desktop)
        document.addEventListener('keyup', (e) => {
            if (keys.hasOwnProperty(e.key)) {
                keys[e.key] = false;
                e.preventDefault();
            }
        });

        // Mostrar productos por defecto al cargar la página
        window.addEventListener('load', function() {
            document.getElementById('productos-section').style.display = 'flex';
        });
