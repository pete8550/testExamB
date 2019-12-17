        const myTable = document.getElementById('myTable');
			fetch('http://localhost:3000/api/devices')
				.then(res => {
					// Check if we can connect
					if (res.status !== 200) {
						return console.log('Could not GET url');
					}
					return res.json();
				})
				.then(response => {
					let lightbulbs = response;
					return lightbulbs.map(lightbulbs => {
						// 
						let tr = document.createElement('tr');
						let td = document.createElement('td');
                        let td2 = document.createElement('td');
                        let td3 = document.createElement('td');
                        let td4 = document.createElement('td');
                        let td5 = document.createElement('td');
                        let td6 = document.createElement('td');
                        let td7 = document.createElement('td');
						// Write text between the tags
						td.innerHTML = lightbulbs.lightbulb_status;
                        td2.innerHTML = lightbulbs.lightbulb_nominal_consume;
                        td3.innerHTML = lightbulbs.lightbulb_actual_consume;
                        td4.innerHTML = lightbulbs.lightbulb_intensity;
                        td5.innerHTML = lightbulbs.lightbulb_color;
                        td6.innerHTML = lightbulbs.lightbulb_hardware_typenumber;
                        td7.innerHTML = lightbulbs.lightbulb_software_version;
						// Append the data to the row
						tr.appendChild(td);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
						myTable.appendChild(tr);
					});
				})
				.catch(err => {
					console.log(err);
				});