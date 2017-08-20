from urllib import request
import json
import pprint
from testPro.models import Data, Jobs
from django.db.models import Q
class Company_Bef():
    def __init__(self, _counter, _name, _addr, _sal):
        self.counter = _counter
        self.name = _name
        self.addr = _addr
        self.sal = _sal
def get_addr_in_area(area_str, cat_str):
    url = f""
    area_num = f''
    cat_num = f''
    if len(area_str) > 0:
        area_Result = Data.objects.filter(Q(area__icontains=area_str))
        #print(area_str)
        #area_Result = Data.objects.annotate(search=SearchVector('area')).filter(search=area_str)
        if area_Result is None or len(area_Result) <= 1:
            return 'Wrong Area'
        print(area_num)
        area_num = area_Result[0].no
        #print('---------------->' + area_num)
        #url = f"http://www.104.com.tw/i/apis/jobsearch.cfm?area={area_num}&cat={cat_num}&order=2&fmt=8&cols=JOB,JOB_ADDRESS,SAL_MONTH_LOW"
    if len(cat_str) > 0:
        cat_Result = Jobs.objects.filter(Q(name__icontains=cat_str))
        print(cat_Result)
        if not cat_Result or len(cat_Result) <= 1:
            return 'Wrong Cat'
        cat_num = cat_Result[0].no
        print('Cat ---------------->' + cat_num)
        #url = f"http://www.104.com.tw/i/apis/jobsearch.cfm?area={area_num}&cat={cat_num}&order=2&fmt=8&cols=JOB,JOB_ADDRESS,SAL_MONTH_LOW"
    if len(area_num) > 0 and len(cat_num) > 0:
        url = f"http://www.104.com.tw/i/apis/jobsearch.cfm?area={area_num}&cat={cat_num}&order=2&fmt=8&pgsz=100&cols=JOB,JOB_ADDRESS,SAL_MONTH_LOW"
    elif len(area_num) > 0:
        url = f"http://www.104.com.tw/i/apis/jobsearch.cfm?area={area_num}&order=2&fmt=8&pgsz=100&cols=JOB,JOB_ADDRESS,SAL_MONTH_LOW"
    elif len(cat_num) > 0:
        url = f"http://www.104.com.tw/i/apis/jobsearch.cfm?cat={cat_num}&order=2&fmt=8&pgsz=100&cols=JOB,JOB_ADDRESS,SAL_MONTH_LOW"
    else:
        url = f""
    if len(url) <= 0:
        return 'Wrong URL'
    print(url)
    response = request.urlopen(url)

    response = response.read().decode('utf-8')
    decode_data = json.loads(response)

    data = decode_data['data']
    addr_ls = []
    i = 0
    for d in data:
        if d.get('JOB_ADDRESS') is None:
            continue
        if d['JOB'] == '' or d['JOB_ADDRESS'] == '' or d['SAL_MONTH_LOW'] == '':
            continue
        c = Company_Bef(_counter=i, _name=d['JOB'].replace(',', '，').replace(':', '：'), _sal='', _addr=d['JOB_ADDRESS'].replace(',','，').replace(':', '：'))
        addr_ls.append(c)
        i = i + 1
        
    #print(addr_ls)

    return addr_ls
