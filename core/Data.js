export function getData(type, options = {}) {
    const xhr = new XMLHttpRequest()
    let url = '/php/currency.php'
    if (type === 'chart') {
        if (options.start)
            url = `/php/currency.php?chart&start=${options.start}&end=${options.end}`
        else   
            url = `/php/currency.php?chart`
    }

    return new Promise(res => {
        xhr.open("GET", url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.responseText
                if (type !== 'chart')
                    res(JSON.parse(data).Valute)
                else
                    res(JSON.parse(data).Record)
            }
        }
        xhr.send()
    })
}
