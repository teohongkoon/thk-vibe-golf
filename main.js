class GolfTracker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.holes = [];
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
        }
        th, td {
          text-align: center;
          width: 20%;
          padding: 8px;
        }
        #total-strokes {
          text-align: center;
          font-size: 1.5rem;
          margin-top: 2rem;
          font-weight: bold;
        }
        .button-container {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        #end-round {
            background-color: #dc3545;
        }
        #end-round:hover {
            background-color: #c82333;
        }
         #end-round:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        tbody tr:nth-child(even) {
            background-color: #e0e0e0;
        }      
      </style>
      <div>
        <form id="hole-form">
          <input type="number" id="par" placeholder="Par" required>
          <input type="number" id="shots-to-green" placeholder="Shots to Green" required>
          <input type="number" id="putts" placeholder="Number of Putts" required>
          <button type="submit">Add Hole</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Hole</th>
              <th>Par</th>
              <th>Shots to Green</th>
              <th>Number of Putts</th>
              <th>Total Strokes</th>
            </tr>
          </thead>
          <tbody id="hole-data">
          </tbody>
        </table>
        <div class="button-container">
            <button id="end-round">End Round</button>
        </div>
        <div id="total-strokes" style="display:none;"></div>
      </div>
    `;

    this.shadowRoot.getElementById('hole-form').addEventListener('submit', this.addHole.bind(this));
    this.shadowRoot.getElementById('end-round').addEventListener('click', this.endRound.bind(this));
  }

  addHole(event) {
    event.preventDefault();
    const par = this.shadowRoot.getElementById('par').value;
    const shotsToGreen = this.shadowRoot.getElementById('shots-to-green').value;
    const putts = this.shadowRoot.getElementById('putts').value;

    if (par && shotsToGreen && putts) {
      const holeData = {
        hole: this.holes.length + 1,
        par: parseInt(par),
        shotsToGreen: parseInt(shotsToGreen),
        putts: parseInt(putts),
        total: parseInt(shotsToGreen) + parseInt(putts),
      };

      this.holes.push(holeData);
      this.updateTable();
      this.clearForm();
      this.shadowRoot.getElementById('par').focus();
    }
  }

  updateTable() {
    const tableBody = this.shadowRoot.getElementById('hole-data');
    tableBody.innerHTML = ''; // Clear existing data

    this.holes.forEach(hole => {
      const row = document.createElement('tr');

      const shotsToGreenColor = 
        (hole.par === 5 && hole.shotsToGreen > 3) ||
        (hole.par === 4 && hole.shotsToGreen > 2) ||
        (hole.par === 3 && hole.shotsToGreen > 1)
          ? 'red'
          : '';

      const puttsColor = hole.putts > 2 ? 'red' : '';
      const totalColor = hole.total === hole.par ? 'green' : '';

      row.innerHTML = `
        <td>${hole.hole}</td>
        <td>${hole.par}</td>
        <td style="color: ${shotsToGreenColor}">${hole.shotsToGreen}</td>
        <td style="color: ${puttsColor}">${hole.putts}</td>
        <td style="color: ${totalColor}">${hole.total}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  clearForm() {
    this.shadowRoot.getElementById('par').value = '';
    this.shadowRoot.getElementById('shots-to-green').value = '';
    this.shadowRoot.getElementById('putts').value = '';
  }

  endRound() {
    const totalStrokes = this.holes.reduce((sum, hole) => sum + hole.total, 0);
    const totalStrokesDiv = this.shadowRoot.getElementById('total-strokes');
    totalStrokesDiv.textContent = `Total Strokes for the round: ${totalStrokes}`;
    totalStrokesDiv.style.display = 'block';

    // Disable form and buttons
    this.shadowRoot.getElementById('par').disabled = true;
    this.shadowRoot.getElementById('shots-to-green').disabled = true;
    this.shadowRoot.getElementById('putts').disabled = true;
    this.shadowRoot.querySelector('button[type="submit"]').disabled = true;
    this.shadowRoot.getElementById('end-round').disabled = true;
  }
}

customElements.define('golf-tracker', GolfTracker);