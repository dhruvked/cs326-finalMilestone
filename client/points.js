class LineBoard{

    async saveLine(slope,intercept){
        try{
            const responseJSON=await fetch('/saveLine',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"slope":slope, "intercept":intercept}),
            })
        }
        catch(err){
            console.log(err)
        }
    }

    async render(element) {
        let responseJSON=await fetch('/topLines',{
            method:'GET',
        })
        let response=await responseJSON.json()
        console.log(response)
        let html = '<h1>Last Lines</h1>';
        html += '<table>';
        html += `
            <tr>
                <th>Slope</th>
                <th>Intercept</th>
            </tr>
        `;
        response.forEach((line) => {
          html += `
            <tr>
              <td>${line.slope}</td>
              <td>${line.intercept}</td>
            </tr>
          `;
        });
        html += '</table>';
        element.innerHTML = html;
    }
}

export const board=new LineBoard();