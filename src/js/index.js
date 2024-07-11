document.getElementById('agendamentoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    fetch('/api/agendar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, data, hora })
    })
    .then(response => response.json())
    .then(data => {
        alert('Consulta agendada com sucesso!');
        window.location.href = 'consagendada.html';
    })
    .catch(error => console.error('Erro:', error));
});

// Função para carregar as consultas agendadas
function loadAppointments() {
    fetch('/api/consultas')
        .then(response => response.json())
        .then(appointments => {
            const appointmentList = document.getElementById('appointmentList');
            appointmentList.innerHTML = ''; // Limpa a lista antes de adicionar os itens

            appointments.forEach(app => {
                const li = document.createElement('li');
                li.classList.add('appointment-item');

                li.innerHTML = `
                    <span class="appointment-date-time">${app.data} ${app.hora}</span>
                    <span class="appointment-name">${app.nome}</span>
                    <span class="appointment-email">${app.email}</span>
                    <span class="appointment-phone">${app.telefone}</span>
                    <button onclick="cancelAppointment(${app.id})">Cancelar</button>
                `;

                appointmentList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Função para cancelar uma consulta
function cancelAppointment(appointmentId) {
    fetch(`/api/cancelar/${appointmentId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Consulta cancelada com sucesso!');
        loadAppointments();
    })
    .catch(error => console.error('Erro:', error));
}

// Chama a função para carregar consultas quando a página é carregada
window.onload = loadAppointments;
