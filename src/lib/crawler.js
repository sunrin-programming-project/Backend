const { JSDOM } = require('jsdom');

async function it_contest_crawl(){
    var contestkorea_data = new URLSearchParams({
        "RetrieveFlag": "",
        "int_gbn": 1,
        "Txt_bcode": "030510001",
        "Txt_host": "",
        "Txt_award": "",
        "Txt_tipyn": "",
        "Txt_comment": "",
        "Txt_resultyn": "",
        "Txt_actcode": "",
        "Txt_sortkey": "a.str_aedate",
        "Txt_sortword": "asc",
        "Txt_code1[]": "29",
        "Txt_bname": "IT•소프트웨어•게임",
        "Txt_bcode": "030510001",
        "Txt_key": "all",
        "Txt_word": ""
    });

    return await contestkorea_crawl(contestkorea_data);
}

async function contestkorea_crawl(data){
    const url = 'https://www.contestkorea.com/sub/list.php';
    const response = await fetch(url, {
        method : "POST",
        body: data
    });
    const htmlString = await response.text();

    const dom = new JSDOM(htmlString);
    let contest_list = dom.window.document.querySelector('.list_style_2').textContent;
    contest_list = contest_list.replace(/\s{3,}/g, '').replace(/IT•소프트웨어•게임/g, '');

    contest_list = contest_list.trim().split(/ \.|(접수중)|(마감임박)|(주최)|(대상)|(접수)|(심사)|(발표)/);
    let filteredArr = contest_list.filter(function(item) {
        return item !== undefined && item !== undefined && item !== null && item.trim() !== '';
    });

    let contest = [];

    for(let i = 0; i < filteredArr.length; i += 12) {
        let like = filteredArr[i].charAt(filteredArr[i].length-1);
        let title = filteredArr[i].slice(0, -1);
        let host = filteredArr[i+2].slice(1);
        let target = filteredArr[i+4].replace(/,/g,', ');
        let register = filteredArr[i+6].replace('~',' ~ ');
        let review = filteredArr[i+6].replace('~',' ~ ');
        let announce = filteredArr[i+10].slice(0, 5);
        let dday = filteredArr[i+10].slice(5, 8);
        

        contest.push({
          title: title,
          like: like,
          host: host,
          target: target,
          register: register,
          review: review,
          announce: announce,
          status: filteredArr[i+11],
          dday: dday
        });
    }

    return contest;
}

module.exports = {
    it_contest_crawl
};