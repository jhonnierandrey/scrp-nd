document.addEventListener('DOMContentLoaded', () => {

    function getResults(e){
        e.preventDefault()
        let url = e.target.weburl.value;
        let siteClassName = e.target.classname.value;

        if(siteClassName[0] != '.'){
            document.querySelector('.error-msg').innerHTML = 'Invalid class name. Must start with a dot (.)';
            return;
        }
        
        if(url.length > 1 && siteClassName.length > 1){
            fetch('/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weburl : url,
                    classname : siteClassName
                })
            })
            .then( response => response.json())
            .then( results => {
                if(results.msg){
                    document.querySelector('.error-msg').innerHTML = results.msg;
                }else{
                    display(results)
                }
            })
        }
    }

    function display(results){
        document.querySelector('.error-msg').innerHTML = '';
        let resultsView = document.querySelector('.results-view');
        let table = document.createElement('table');
        table.classList.add('table');

        let tableBody = document.createElement('tbody');

        for (let i = 0; i < results.length; i++) {
            let tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td><h5>${results[i].title}</h5></td><td><a class='btn btn-outline-success' href='${results[i].web_url}' target='_blank'>Go <i class="bi bi-arrow-up-right-circle"></i></a></td>`;
            tableBody.append(tableRow)
        }
        table.append(tableBody);
        resultsView.append(table);
    }

    document.querySelector('form').addEventListener('submit', getResults);
})