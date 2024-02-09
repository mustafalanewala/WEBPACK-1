document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const currentMonthBtn = document.getElementById('current-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar() {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        let html = `
            <h2>${monthNames[currentMonth]} ${currentYear}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let date = 1;
        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfWeek) {
                    html += `<td class="prev-month"></td>`;
                } else if (date > daysInMonth) {
                    html += `<td class="next-month"></td>`;
                } else {
                    let classNames = [];
                    if (date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                        classNames.push('current-day');
                    }
                    html += `<td class="${classNames.join(' ')}" onclick="selectDate(${date})">${date}</td>`;
                    date++;
                }
            }
            html += '</tr>';
        }

        html += `
                </tbody>
            </table>
        `;

        calendar.innerHTML = html;
    }

    function selectDate(date) {
        console.log(`Selected date: ${date}/${currentMonth + 1}/${currentYear}`);
    }

    function setCurrentMonth() {
        today = new Date();
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
        renderCalendar();
    }

    renderCalendar();

    prevMonthBtn.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    currentMonthBtn.addEventListener('click', setCurrentMonth);

    nextMonthBtn.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
});
