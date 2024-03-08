import { JSDOM } from 'jsdom';

interface ContestList {
    url: string;
    title: string;
    host: string;
    target: string;
    register: string;
    review: string;
    announce: string;
    status: string;
    dday: string;
}

const filter_list = [
    '문학•문예',
    '네이밍•슬로건',
    '경시•학문•논문',
    '과학•공학•기술',
    'IT•소프트웨어•게임',
    '스포츠',
    '그림•미술',
    '디자인•캐릭터•웹툰',
    '콩쿠르•성악•국악•동요',
    '음악•가요•댄스•무용',
    '뷰티•선발•배우•오디션',
    '사 진',
    'UCC•동영상',
    '아이디어•제안',
    '산업•사회•건축•관광•창업',
    '취미•이색•반려동물',
    '요리•음식•식품'
]

async function ITContestCrawl(): Promise<ContestList[]> {
    const contestkorea_data = new URLSearchParams({
        "RetrieveFlag": "",
        "int_gbn": "1",
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
        "Txt_key": "all",
        "Txt_word": ""
    });

    return await contestkorea_crawl(contestkorea_data);
}

async function contestkorea_crawl(data: URLSearchParams): Promise<ContestList[]> {
    const ContestGetURL: string = 'https://www.contestkorea.com/sub/list.php';

    let response = await fetch(ContestGetURL, {
        method: "POST",
        body: data
    });

    let htmlString: string = await response.text();
    let dom = new JSDOM(htmlString);
    
    let contest_list: string[] = dom.window.document.querySelector('.list_style_2').textContent.replace(/\s{3,}/g, '').replace(/IT•소프트웨어•게임/g, '').trim().split(/ \.|(접수중)|(마감임박)|(주최)|(대상)|(접수)|(심사)|(발표)/);

    let hrefTags: string[] = [];
    dom.window.document.querySelector('.list_style_2').querySelectorAll('a').forEach((element: HTMLAnchorElement) => {
        hrefTags.push(element.href);
    });

    for(let i = 0; i < hrefTags.length; i++) {
        hrefTags[i] = hrefTags[i].split('str_no=')[1];
    }

    let contest_link = [];

    for (let i = 0; i < hrefTags.length; i++) {
        let ContestLinkURL: string = `https://www.contestkorea.com/sub/view.php?str_no=${hrefTags[i]}`;
        let response = await fetch(ContestLinkURL, {
            method: "GET"
        });
        let htmlString: string = await response.text();
        let dom = new JSDOM(htmlString);
        contest_link.push(dom.window.document.querySelector('.txt_area').querySelector('a').href);
    }
    

    let filteredArr: string[] = contest_list.filter(function(item: string) {
        return item !== undefined && item !== undefined && item !== null && item.trim() !== '';
    });

    let contest: ContestList[] = [];

    for(let i = 0; i < filteredArr.length; i++) {
        if(filteredArr[i] === '￦ 유료 ') {
            filteredArr.splice(i, 2);
       }
        for(let j = 0; j < filter_list.length; j++) {
          if(filteredArr[i].includes(filter_list[j])) {
            filteredArr[i] = filteredArr[i].replace(filter_list[j], '');
          }
        }
      }

    for(let i = 0; i < filteredArr.length; i += 12) {
        if (filteredArr[i]) {
            let url = contest_link[i/12];
            let title = filteredArr[i].slice(0, -1);
            let host = filteredArr[i+2] ? filteredArr[i+2].slice(1) : '';
            let target = filteredArr[i+4] ? filteredArr[i+4].replace(/,/g,', ') : '';
            let register = filteredArr[i+6] ? filteredArr[i+6].replace('~',' ~ ') : '';
            let review = filteredArr[i+6] ? filteredArr[i+6].replace('~',' ~ ') : '';
            let announce = filteredArr[i+10] ? filteredArr[i+10].slice(0, 5) : '';
            let dday = filteredArr[i+10] ? filteredArr[i+10].slice(5) : '';
            
            contest.push({
              url: url,
              title: title,
              host: host,
              target: target,
              register: register,
              review: review,
              announce: announce,
              status: filteredArr[i+11] ? filteredArr[i+11] : '',
              dday: dday
            });
        }
    }

    return contest;
}

export {
    ITContestCrawl
};
