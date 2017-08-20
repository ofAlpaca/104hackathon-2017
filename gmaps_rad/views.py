from django.shortcuts import render
import googlemaps
from gmaps_rad.gmap_radscan import *
from gmaps_rad.area_job_finder import get_addr_in_area 

def home(request):
    return render(request, 'home.html')

def show_map(request):
	area_str = request.POST['area_str']
	num = request.POST['input_text']
	print('----------------->')
	addr_ls = get_addr_in_area(area_str, num)
	if addr_ls == 'Wrong Area' or addr_ls == 'Wrong URL' or addr_ls == 'Wrong Cat':
		return render(request, 'gmaps.html', {'list': None})
	#company_ls = order_by_num(addr_ls)
	return render(request, 'gmaps.html', {'list': addr_ls, 'num':len(addr_ls)})

def show_final(request):
	addr_ls = request.POST['selected']
	company_ls = order_by_num(addr_ls)
	print(company_ls)
	return render(request, 'final.html', {'list': company_ls})


