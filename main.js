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
        :host {
          display: block;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        #hole-form {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        input {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          width: 100%;
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 2rem;
          table-layout: fixed;
        }

        thead {
          background-color: #007bff;
          color: white;
        }

        th, td {
          padding: 1rem;
          text-align: center;
        }

        th {
          font-size: 1.1rem;
          width: 20%;
        }

        tbody tr:nth-child(even) {
          background-color: #e6e6fa;
        }

        tbody tr:nth-child(odd) {
          background-color: #add8e6;
        }

        td {
          font-weight: bold;
          color: #333;
        }

        .button-container {
            text-align: center;
            margin-top: 2rem;
        }

        #total-strokes {
            text-align: center;
            margin-top: 1rem;
            font-size: 1.2rem;
            font-weight: bold;
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
          : '#333';

      const puttsColor = hole.putts > 2 ? 'red' : '#333';
      const totalColor = hole.total === hole.par ? 'green' : '#333';

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