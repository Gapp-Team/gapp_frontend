import React, {useEffect, useState} from 'react';
import { View, Text, Modal,TouchableOpacity, StyleSheet, ScrollView, TextInput, Switch, Button } from 'react-native';
import Icon, { Icons } from '../../components/Icon';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';


const fetchFonts = async () => {
    await Font.loadAsync({
      'Raleway': require('../../assets/Fonts/Raleway-Regular.ttf'),
    });
  };


const CustomModal = ({ visible, onClose, addEtkinlik }) => {

    useEffect(() => {
        fetchFonts();
      }, []);
    
    const [selectedOption, setSelectedOption] = useState('');

    const optionsTekrar = [
        { label: 'Her Hafta', value: 'Her Hafta'  },
        { label: 'Her Ay', value: 'Her Ay'  },
        { label: 'Her 2 Ayda Bir', value: 'Her 2 Ayda Bir'},
        { label: 'Her Yıl',  value: 'Her Yıl' },
        { label: 'Hiçbir Zaman', value: 'Hiçbir Zaman' },
      ];
    const optionsHatirlatici = [
        { label: 'Etkinlik Saatinde', value: 'Etkinlik Saatinde' },
        { label: '5 Dakika Önce', value: '5 Dakika Önce' },
        { label: '10 Dakika Önce', value: '10 Dakika Önce' },
        { label: '15 Dakika Önce', value: '15 Dakika Önce' },
        { label: '30 Dakika Önce', value: '30 Dakika Önce' },
        { label: '1 Saat Önce', value: '1 Saat Önce' },
        { label: '2 Saat Önce', value: '2 Saat Önce' },
        { label: '1 Gün Önce', value: '1 Gün Önce' },
        { label: '2 Gün Önce', value: '2 Gün Önce' },
        { label: '1 Hafta Önce', value: '1 Hafta Önce' },
        { label: 'Yok', value: 'Yok' },
      ];


    const [tekrar, setTekrar] = useState('Hiçbir Zaman');
    const [hatirlatici, setHatirlatici] = useState('Yok');

    const [selectedColor, setSelectedColor] = useState(null);

    const colors = ['#DE26264D', '#15CD5E4D', '#775DDD4D', '#5dbddd4D', '#dd5daa4d', '#8edd5d4d', '#dddd5d4d', '#ddaa5d4d', '#dd725d4d'];
    
    const [baslik, setBaslik] = useState('');
    const [konum, setKonum] = useState('');
    const [bildirimAcik, setBildirimAcik] = useState(false); 
    const [aciklama, setAciklama] = useState(''); 
    const [etkinlikler, setEtkinlikler] = useState([]);
    const [baslangicTarih, setBaslangicTarih] = useState(new Date());
    const [bitisTarih, setBitisTarih] = useState(new Date()); 

    const handleBaslangicTarihSec = (selectedDate) => {
        setBaslangicTarih(selectedDate);
      };
      const handleBitisTarihSec = (selectedDate) => {
        setBitisTarih(selectedDate);
      };
    const handleSaveData = () => {
        const yeniEtkinlik = {
            baslik: baslik,
            konum: konum,
            bildirimAcik: bildirimAcik,
            tekrar: tekrar,
            hatirlatici: hatirlatici,
            selectedColor: selectedColor,
            aciklama: aciklama,
            baslangicTarih: baslangicTarih,  
            bitisTarih: bitisTarih
        };
        console.log('Yeni Etkinlik:', yeniEtkinlik);
        addEtkinlik(yeniEtkinlik);
    
        onClose();
    };
    
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ width: 300, height: 300, backgroundColor: 'white', borderRadius: 25,backgroundColor:'#eeedfc' }}>
                <View style = {{ flexDirection: 'row', padding:10, justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={onClose} >
                        <Icon type={Icons.Ionicons} name="close-sharp" size={30} color="black"  />
                    </TouchableOpacity>
                    <Text style={styles.baslik}>Yeni Etkinlik</Text>
                    <TouchableOpacity onPress={handleSaveData}>
                        <Icon type={Icons.Feather} name="check" size={30} color="black"  />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Başlık</Text>
                        <TextInput
                        style={styles.input}
                        onChangeText={(text) => setBaslik(text)}
                        value={baslik}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Konum</Text>
                        <TextInput
                        style={styles.input}
                        onChangeText={(text) => setKonum(text)}
                        value={konum}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Bütün Gün</Text>
                        <Switch
                            value={bildirimAcik}
                            onValueChange={(newValue) => setBildirimAcik(newValue)}
                            trackColor={{ false: '#381163', true: '#381163' }} 
                            thumbColor={bildirimAcik ? '#CA91F6' : '#381163'} 
                            style={[styles.toggle, { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }]} 
                            />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Başlangıç</Text>
                        <View style={{marginLeft:'auto', flexDirection:'row'}}> 
                            <DateTimePicker
                                    value={baslangicTarih || new Date()}
                                    mode="datetime"
                                    onChange={(event, selectedDate) => handleBaslangicTarihSec(selectedDate)}
                                    style={{ width: 170 }}
                            />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Bitiş</Text>
                        <View style={{marginLeft:'auto', flexDirection:'row'}}> 
                            <DateTimePicker
                                    value={bitisTarih || new Date()} 
                                    mode="datetime"
                                    onChange={(event, selectedDate) => handleBitisTarihSec(selectedDate)}
                                    style={{ width: 170 }}
                                />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Tekrar</Text>
                        <View style={{marginLeft:'auto', flexDirection:'row'}}> 
                            <RNPickerSelect
                            onValueChange={(value) => setTekrar(value)}
                                items={optionsTekrar}
                                value={tekrar}
                            />
                            <Icon type={Icons.AntDesign} name="right" size={15} color="black" style={{marginLeft: 7}} />
                        </View>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Hatırlatıcı Ekle</Text>
                        <View style={{marginLeft:'auto', flexDirection:'row'}}> 
                            <RNPickerSelect
                                onValueChange={(value) => setHatirlatici(value)}
                                items={optionsHatirlatici}
                                value={hatirlatici}
                            />
                            <Icon type={Icons.AntDesign} name="right" size={15} color="black" style={{marginLeft: 7}} />
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}>Renk Seç</Text>
                        <View style={styles.colorContainer}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.color,
                                    {
                                        backgroundColor: color,
                                        borderColor: selectedColor === color ? 'black' : 'transparent', 
                                        borderWidth: selectedColor === color ? 2 : 0, 
                                    },
                                ]}
                                onPress={() => setSelectedColor(color)}
                            />
                            ))}
                        </View>
                    </View>
                    <View style={styles.itemAciklama}>
                        <Text style={styles.itemtext}>Açıklama Ekle</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                            style={styles.inputAciklama}
                            multiline
                            numberOfLines={1}
                            onChangeText={(text) => setAciklama(text)} 
                            value={aciklama}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
        </Modal>
    );

  
};
const styles = StyleSheet.create({
    modalContainer:{
        width: 300, 
        height: 300, 
        backgroundColor: 
        'white', 
        borderRadius: 10,
        borderWidth:1 
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop:10,
    },
    baslik:{
        fontFamily:'Raleway',
        fontSize:20
    },
    item: {
        fontFamily:'Raleway',
        padding:10,
        flexDirection:'row'
    },
    itemtext:{
        fontFamily:'Raleway',
        fontWeight:'bold',
        fontSize: 15
    },
    input: {
        width:200,
        marginLeft:'auto',
        borderBottomWidth:1,
    },
    toggle:{
        marginLeft:'auto',
    },
    baslangic:{
        marginLeft:'auto',        

    },
    bitis:{
        marginLeft:'auto',        
    },
    tekrar:{
        flexDirection: 'row',
        marginLeft:'auto',        
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft:'auto'

      },
      color: {
        width: 11,
        height: 11,
        borderRadius: 25,
        margin: 5,
      },
      selectedColorText: {
        marginTop: 20,
        fontSize: 16,
      },
      itemAciklama: {
        flexDirection: 'column',
        padding:10,
      },
      inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputAciklama: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
        flex: 1,
        paddingVertical: 5,
      },
      baslangicTarih:{
        marginLeft:'auto',
        flexDirection:'row'
      },
      bitisTarih:{
        marginLeft:'auto',
      }
});
export default CustomModal;
