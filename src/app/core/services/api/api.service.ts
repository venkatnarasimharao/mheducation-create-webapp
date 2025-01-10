import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BOOK_COVER_IMAGES, USER_SEARCH_CONFIG } from '../../../shared/constants/search-payload.config';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private sessionId = 'OjdQc2s4Tnxgvyu59D1MUSo7Q7SF-kNYnUOECLyBy20TrPfs8CFp!-1483110411!1736516528952';
  private cookie = '_gcl_au=1.1.1566444945.1733215022; s_ecid=MCMID%7C79681654544795448780163821333183394937; _mkto_trk=id:128-SJW-347&token:_mch-mheducation.com-1733215028342-18006; OptanonAlertBoxClosed=2024-12-03T08:37:12.673Z; AMCV_C5E7148954EA18A10A4C98BC%40AdobeOrg=-432600572%7CMCIDTS%7C20074%7CMCMID%7C79681654544795448780163821333183394937%7CMCAAMLH-1734947605%7C12%7CMCAAMB-1734947605%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1734350005s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.5.2; mbox=PC#903dc845c21d47a790c1320d997b0a10.41_0#1797587649|session#29db48d12f49411e97881afedbcde9f7#1734344665; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Dec+16+2024+15%3A24%3A09+GMT%2B0530+(India+Standard+Time)&version=202303.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=d71cbe5d-f8f4-42a5-92c3-11ef83de9441&interactionCount=1&landingPath=NotLandingPage&groups=C0004%3A1%2CC0003%3A1%2CC0001%3A1%2CC0002%3A1&geolocation=IN%3BKA&AwaitingReconsent=false; _fbp=fb.1.1734342851277.632709471742440047; _tt_enable_cookie=1; _ttp=x1lbmhSb_Q4LGcIPTYb_QA7mPbu.tt.1; _uetvid=c8af0ab0b15111ef9a34d3af8670310a|1mb2c5|1734342852536|2|1|bat.bing.com/p/insights/c/a; __adroll_fpc=588389571405a60567e3adb496ca7a49-1734342852934; lastVisitDays=1734342865484; s_nr=1734342865485-Repeat; _ga_BQW6271GD0=GS1.1.1734342807.2.1.1734342872.60.0.0; _ga_FFKYW5S6V3=GS1.1.1734342807.2.1.1734342872.0.0.0; session_start_time=1734759182268; k_visit=3; _ga_FLEHK5F07H=GS1.2.1735036661.1.1.1735047221.60.0.0; _gid=GA1.2.25469259.1736413162; _ga_Q847QRWYCF=deleted; JSESSIONID_CRT=OjdQc2s4Tnxgvyu59D1MUSo7Q7SF-kNYnUOECLyBy20TrPfs8CFp!-1483110411; ERIGHTS=301414771736516531420858a004ad8de44158960fc468b03f98a; _gat_gtag_UA_47123043_30=1; _gat_UA-47123043-30=1; _ga=GA1.1.834373710.1732772506; _ga_Q847QRWYCF=GS1.1.1736516601.2.1.1736516604.0.0.0; _ga_JEJ4PS9P4K=GS1.1.1736516601.27.1.1736516609.52.0.0'
  constructor( 
    private http: HttpClient, 
    private cookieService: CookieService
  ) {
    this.cookieService.set('JSESSIONID', this.cookie,1);
  }

  getSearchListing() {
    const finalPay = USER_SEARCH_CONFIG
    let languages: any = sessionStorage.getItem('languages');
    if (languages) {
      languages = JSON.parse(languages);
      finalPay['search']['facets']['facet'][4]['item'] = languages.map((item: any) => ({
        _label: item.displayValue._text,
        _value: item.name._text,
        _selected: "false" // item.enabled._text === "true" ? "true" : 
      }))
    }
    finalPay.search.textTypes.textType = 'all' // title | all | ["title","authors", "isbn", "description"];
    return this.apiMethodService({
      url: `/p/users/anonymous/search`,
      method: 'POST',
      body: finalPay,
      options: { responseType: 'text' }
    })
  }

  userLogin(payload: { username: string, password: string }) {
    const { username, password } = payload;
    const base64String = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${base64String}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
    return this.apiMethodService({
      url: '/createonline/loginUser.do',
      method: 'POST',
      options: {headers},
      body: null
    });
  }


  getCollectionsFilterList() {
    return this.apiMethodService({ url: '/p/collectionsfilter', method: 'GET' })
  }

  getCollectionsList() {
    return this.apiMethodService({ url: '/p/sites/create.mheducation.com/80/createonline?nocacheTimestamp=1734610727137&taxonomyfacets=true&locale=en_US', method: 'GET' })
  }

  getTaxonomyfacetsList() {
    return this.apiMethodService({ url: '/p/taxonomyfacets/create.mheducation.com/80/createonline', method: 'GET' })
  }

  getCoverPhotosList() {
    return this.apiMethodService({ url: '/p/searchcovers', method: 'POST', body: BOOK_COVER_IMAGES })
  }

  getLanguagePropsList() {
    const languageCode = 'en_US'
    return this.apiMethodService({ url: `/locale/${languageCode}/props.json`, method: 'GET' });
  }

  getProjectData(userId: string, projectId: string): Observable<any> {
    const cookie = this.cookieService.get('JSESSIONID');
    console.log(cookie);
    const timestamp = new Date().getTime();
    
    const headers = new HttpHeaders({
      'x-mh-locale': 'en_US',
      'x-mh-locale-override': 'en_US',
      'cookie': `_gcl_au=1.1.1566444945.1733215022; s_ecid=MCMID%7C79681654544795448780163821333183394937; _mkto_trk=id:128-SJW-347&token:_mch-mheducation.com-1733215028342-18006; OptanonAlertBoxClosed=2024-12-03T08:37:12.673Z; AMCV_C5E7148954EA18A10A4C98BC%40AdobeOrg=-432600572%7CMCIDTS%7C20074%7CMCMID%7C79681654544795448780163821333183394937%7CMCAAMLH-1734947605%7C12%7CMCAAMB-1734947605%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1734350005s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.5.2; mbox=PC#903dc845c21d47a790c1320d997b0a10.41_0#1797587649|session#29db48d12f49411e97881afedbcde9f7#1734344665; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Dec+16+2024+15%3A24%3A09+GMT%2B0530+(India+Standard+Time)&version=202303.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=d71cbe5d-f8f4-42a5-92c3-11ef83de9441&interactionCount=1&landingPath=NotLandingPage&groups=C0004%3A1%2CC0003%3A1%2CC0001%3A1%2CC0002%3A1&geolocation=IN%3BKA&AwaitingReconsent=false; _fbp=fb.1.1734342851277.632709471742440047; _tt_enable_cookie=1; _ttp=x1lbmhSb_Q4LGcIPTYb_QA7mPbu.tt.1; _uetvid=c8af0ab0b15111ef9a34d3af8670310a|1mb2c5|1734342852536|2|1|bat.bing.com/p/insights/c/a; __adroll_fpc=588389571405a60567e3adb496ca7a49-1734342852934; lastVisitDays=1734342865484; s_nr=1734342865485-Repeat; _ga_BQW6271GD0=GS1.1.1734342807.2.1.1734342872.60.0.0; _ga_FFKYW5S6V3=GS1.1.1734342807.2.1.1734342872.0.0.0; session_start_time=1734759182268; k_visit=3; _ga_FLEHK5F07H=GS1.2.1735036661.1.1.1735047221.60.0.0; _gid=GA1.2.25469259.1736413162; _ga_Q847QRWYCF=deleted; JSESSIONID_CRT=OjdQc2s4Tnxgvyu59D1MUSo7Q7SF-kNYnUOECLyBy20TrPfs8CFp!-1483110411; ERIGHTS=301414771736516531420858a004ad8de44158960fc468b03f98a; _gat_gtag_UA_47123043_30=1; _gat_UA-47123043-30=1; _ga=GA1.1.834373710.1732772506; _ga_Q847QRWYCF=GS1.1.1736516601.2.1.1736516604.0.0.0; _ga_JEJ4PS9P4K=GS1.1.1736516601.27.1.1736516609.52.0.0`
    });
 
    return this.apiMethodService({
      url: `/p/users/30141477/projects/1d0d1b85-aae4-267d-b373-4127c6d37a55;jsessionid=OjdQc2s4Tnxgvyu59D1MUSo7Q7SF-kNYnUOECLyBy20TrPfs8CFp!-1483110411!1736516528952?nocacheTimestamp=1736516611575`,
      options: {
        headers: headers,
      },
      method: 'GET',
      body: null
    });
  }

    saveProjectData(userId: string, projectId: string, data: any): Observable<any> {
 
    return this.apiMethodService({
      url: `/projects/${projectId}`,
      method: 'PUT',
      body: null,
    })
  }

  apiMethodService<T>({ url, method, body, params = {}, options = {} }: any): Observable<any> {
    url = environment.apiUrl + url;
    options = {
      responseType: 'text',
      observe: 'response',
      ...options
    };

    switch (method?.toUpperCase()) {
      case 'GET':
        return this.http.get(url, options);
      case 'GET_PARMS':
        return this.http.get(url, { params: params, ...options });
      case 'GET_IMAGE':
        return this.http.get(url, { responseType: 'blob' as 'json', ...options });
      case 'PUT':
        return this.http.put(url, body, options);
      case 'PUT_PARAMS':
        return this.http.put(url, body, { params: params, ...options });
      case 'POST':
        return this.http.post(url, body, options);
      case 'DELETE':
        return this.http.delete(url, options);
      default:
        return this.http.get(url, options);
    }
  }

}
