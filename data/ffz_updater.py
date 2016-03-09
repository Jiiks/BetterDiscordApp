import json, requests

r = requests.get('http://api.frankerfacez.com/v1/room/immersedcimp')
data = json.loads(r.text)
channel_id = data['room']['_id']
emoticons_list = data['sets'][str(channel_id)]['emoticons']
emote_dict = dict()
for emoticon in emoticons_list:
    emote_dict[emoticon['name']] = unicode(str(emoticon['urls']).split("/")[4])

print(emote_dict)
with open('emotedata_ffz.json') as data_file:
    data = json.load(data_file)
data.update(emote_dict)
with open('emotedata_ffz.json', 'w') as f:
    json.dump(data, f)
