import googlemaps
import operator
import pprint

class Company():
    def __init__(self, _name, _addr, _num):
        self.name = _name
        self.addr = _addr
        self.num_of_points = _num

def get_info_by_radar(_addr):
    gmaps = googlemaps.Client(key='AIzaSyB0x8tiBa-AsKjpZMSEqr8_GkILmmq_cFc')
    pp = pprint.PrettyPrinter(indent=4)
    #print('Address:'+_addr)
    geocode_result = gmaps.geocode(_addr) 
    if len(geocode_result) == 0:
        return 0

    #pp.pprint(geocode_result)
    location = geocode_result.pop().get('geometry').get('location')
    #location = geocode_result[0].get('geometry').get('location')
    lat = location.get('lat')
    lng = location.get('lng')
    _radius = 50
    result = gmaps.places_radar(type=['school', 'night_club', 'museum', 'library', 'clothing_store', 'convenience_store', 'restaurant', 'bus_station', 'train_station', 'taxi_stand', ''], location=(lat, lng), radius=_radius)
    #result = gmaps.places_radar(type=['food', 'room'], location=(lat, lng), radius=_radius)

    if result.get('status') == 'OK':
        numOfResult = len(result.get('results'))
    else:
        numOfResult = 0

    return numOfResult

def order_by_num(locations):
    location_list = locations.split(',')
    
    rank_ls = list()
    for data in location_list:
        if len(data) <= 0:
             break
        ll = data.split(':')
        if len(ll) <= 0:
            break
        print(ll[0])
        print(ll[1])
        num = get_info_by_radar(ll[1])
        rank_set = Company(ll[0], ll[1], num)
        rank_ls.append(rank_set)
    rank_ls.sort(key=lambda c : c.num_of_points, reverse=True)
    return rank_ls
