class LineBoard{
    constructor(){
        this.lines=[];
    }

    async saveLine(user,slope,intercept){
        try{
            let newLine={user,slope,intercept};
            const responseJSON=await fetch('/saveLine',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(neword),
            })
            this.lines.push(newLine)
        }
        catch(err){
            console.log(err)
        }
    }

    render(element) {
        let html = '<h1>Last Lines</h1>';
        html += '<table>';
        this.lines.forEach((line) => {
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

export const line=new LineBoard();