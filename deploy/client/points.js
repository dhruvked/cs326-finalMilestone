class LineBoard{
    constructor(){
        this.lines=[];
    }

    async saveLine(user,slope,intercept){
        try{
            let newLine={user,slope,intercept};
            console.log(newLine)
            const responseJSON=await fetch('/saveLine',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newLine),
            })
            this.lines.push(newLine)
        }
        catch(err){
            console.log(err)
        }
    }

    render(element) {
        
        const responseLineJson=await fetch('/top10lines',{
            method:'GET',
        })
      
        let responseLine=await responseLineJson.json();
        let html = '<h1>Last Lines</h1>';
        html += '<table>';
        html += `
            <tr>
                <th>USER</th>
                <th>Slope</th>
                <th>Intercept</th>
            </tr>
        `;
        responseLine.forEach((line) => {
          html += `
            <tr>
              <td>${line.user}</td>
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