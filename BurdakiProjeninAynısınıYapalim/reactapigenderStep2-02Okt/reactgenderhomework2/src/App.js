//Step2 Branch...

import React from "react";

class App extends React.Component {
  state = {
    people: [],
    error: false,
    loading: true,
    index: 0,
    gender: "random",
    region: "random",
    persons: []
  };

  handleKeypress = e => {
    console.log("handlekeypress çalıştı!!");
    if (e.code === "Space") {
      this.state.index < this.state.people.length - 1
        ? this.setState(
            {
              index: this.state.index + 1
            },
            () => console.log("index: ", this.state.index)
          )
        : this.setState(
            {
              index: 0
            },
            () =>
              console.log(
                "index eğer dizi eleman sayısını geçerse:  ",
                this.state.index
              )
          );
    }
  };

  componentDidMount = async () => {
    //Bizim bu component did mount çalıştığında olmasını istediğimiz herşey bu component kaldırılana kadar çalışacaktır ki burası direk root old için yani direk index.js ye bağlı old için zaten kaldırılma durumu yok diyebiliriz yani biz handlekeypress çalışsın diyourz handle keypress zaten sürekli çalışacağı için biz gidip birde diğer veri getirme fonksiyonlarında handle keypress i çağırmamıza gerek yok ondan dolayı orda çağırırsak handle keypress iki kez gelir...
    console.log("ComponentDidmount çalıştı");
    //Bind yapmıyoruz arrow func olsun class larda this diye çağırıyoruz
    const response = await fetch("https://uinames.com/api/?ext&amount=10");
    const people = await response.json();
    window.addEventListener("keypress", this.handleKeypress);
    this.setState(
      {
        people: people,
        index: this.state.index + 1 //Burayı değiştirmezsek o zaman ilk başta da veriler hiç gelmeyecek...
      },
      () => console.log(this.state.people)
    );
  };

  componentWillUnmount = () => {
    window.removeEventListener("keypress", this.handleKeypress);
  };

  //https://uinames.com/api/?ext&amount=25&region=armenia&gender=male
  //https://uinames.com/api/?ext&amount=10&gender=female
  //https://uinames.com/api/?ext&amount=25&region=random&gender=male&source=uinames.com
  //https://uinames.com/api/?ext&amount=25&region=random&gender=${this.state.gender}&source=uinames.com

  handleRandomClick = async gender => {
    //bind ile bağlamamak için arrow kullandık
    console.log("Randomclick çalıştı...");
    this.setState(
      {
        //Burda parametreden gelen veriyi gender e eşitledik ki bu veri de random a tıklanırsa random tıklama da ne gönderirse buraya o gelir aynı şekilde male tıklayınca ne gönderirse buraya o gelir ve female ne tıklarsa buraya o gelecektir...
        gender: gender
      },
      async () => {
        try {
          const response = await fetch(
            `https://uinames.com/api/?ext&amount=10&region=${
              this.state.region
            }&gender=${this.state.gender}&source=uinames.com `
          );
          const random = await response.json();
          //burda document.addEventlistener yaptığımda index in 2şer 2şer arttı ama window.add yaptığımda 1 er 1 er arttı bu neden oluyordu buna bakalımm

          console.log(gender, ":  ", random);
          console.log(
            `https://uinames.com/api/?ext&amount=10&region=random&gender=${
              this.state.gender
            }&source=uinames.com `
          );
          this.setState(
            {
              people: random,
              loading: false
            },
            () => console.log("Afer Click: ", this.state.people)
          ); //setState lerde Callback konusu çok önemli...
        } catch (error) {
          this.setState({
            error: true,
            loading: false
          });
        }
      }
    );
  };
  //https://uinames.com/api/?ext&amount=10&region=Turkey&gender=&source=uinames.com
  //https://uinames.com/api/?ext&amount=25&region=armenia&gender=male&source=uinames.com
  //Buranın öncesinde zaten male,female ve random url leri butonlara tıklayınca ayarladık statteki gender propertiesi ile dolayısı ile biz select option da ülke seçince url nin de aynı şekilde seçtiğimiz ülke ve en sonra hangi gender seçilmişse onun gelmesi için zaten biz gender ları state ten ayarlamıştık o zaten en son seçilen gender e göre dinamik olarak yaptık biz url nin içinde gender kısmına this.state.gender yazar region kısmını da e.target.value den aldık mı tamamdır...
  handleSelectRegion = async e => {
    console.log("REGİOn", e.target.value);
    this.setState(
      {
        region: e.target.value
      },
      async () => {
        try {
          const response = await fetch(
            `https://uinames.com/api/?ext&amount=10&region=${
              this.state.region
            }&gender=${this.state.gender}&source=uinames.com `
          );
          const random = await response.json();
          //burda document.addEventlistener yaptığımda index in 2şer 2şer arttı ama window.add yaptığımda 1 er 1 er arttı bu neden oluyordu buna bakalımm

          console.log(
            "Apiden gelen veri setState ile değişmeden önce...: ",
            random
          );
          console.log(
            `https://uinames.com/api/?ext&amount=10&region=${
              this.state.region
            }&gender=${this.state.gender}&source=uinames.com `
          );
          this.setState(
            {
              people: random,
              loading: false
            },
            () => console.log("Afer Click: ", this.state.people)
          ); //setState lerde Callback konusu çok önemli...
        } catch (error) {
          this.setState({
            error: true,
            loading: false
          });
        }
      }
    );
  };
  /*BURAYI İNCELEE.....
  function clickFunc(gender = 'random', region = 'random') { const url = `uinames.com/?ext&gender=${gender}&region=${region}` if (gender) { fetch(url) } else { fetch(url) } } clickFunc('male'); // Gender calistirilirken clickFunc(null, 'turkey') // Region calistirilirken
  */
  //https://reacttraining.com/react-router/web/example/basic  BU LİNK lazım olacak...

  shouldComponentUpdate(Nextprops, Nextstate) {
    console.log("NextStateIndex:", Nextstate.index);
    console.log("Render dan öne index: ", this.state.index);
    console.log("Render dan önce people verisi: ", this.state.people);

    return Nextstate.index !== this.state.index;
  } //return sonucu true olursa render eder  false olursa render etmeyecek...

  render() {
    const { people, index } = this.state;
    return (
      <div className="container">
        <div className="row" style={{ margin: "20px" }}>
          <div className="col-md-1" style={{ marginRight: "15px" }}>
            <input
              type="button"
              value="Random"
              className="btn btn-info"
              onClick={() => this.handleRandomClick("random")}
            />
          </div>
          <div className="col-md-1">
            <input
              type="button"
              value="Male"
              className="btn btn-primary"
              onClick={() => this.handleRandomClick("male")}
            />
          </div>
          <div className="col-md-1" style={{ marginLeft: "-10px" }}>
            <input
              type="button"
              value="Female"
              className="btn btn-danger"
              onClick={() => this.handleRandomClick("female")}
            />
          </div>
          <div className="col-md-2" style={{ marginLeft: "6px" }}>
            <div className="input-group mb-3">
              <select
                data-placeholder="Choose a Language..."
                className="custom-select"
                id="inputGroupSelect01"
                onChange={this.handleSelectRegion}
              >
                <option>Random</option>
                <option> Azerbaijan </option>
                <option> Romaina </option>
                <option> Slovakia </option>
                <option> Greece </option>
                <option>Turkey </option>
                <option> Spain </option>
                <option>Nepal </option>
                <option> Belgium </option>
                <option> Brazil </option>
                <option> Canada </option>
                <option> China </option>
                <option> Denmark </option>
                <option>England </option>
                <option> Finland </option>
                <option>France </option>
                <option> Georgia </option>
                <option> Germany </option>
              </select>
            </div>
          </div>
          <div className="col-md-7" />
        </div>
        <hr />
        <div className="row" style={{ textAlign: "center", marginTop: "30px" }}>
          <div className="col-md-4" />

          {this.state.error ? (
            <p>Server da bir hata var...</p>
          ) : this.state.people.length > 0 ? ( //Burda biz diyoruz ki eğer people verisinin içi dolu ise yazdır boş ise veriler geliyor yazdır dedik kki fetch ile verilerin gelmesi zaman alıyor ayrıca asenkron bir işlem old için senkronlardan sonra çalışacak dolayısı ile biz daha gelmeyen veriyi göstermeye çalışmamak içn bu işlemi yaptık ancak esasında bu işlemi biz loading ile de yapabilirdik ki zaten bu amaçla yapmıştık loading i ve errror işlemini de kontrolü de yapalım ki adresimizde sıkıntı olursa hata mesajı döndürebilelim....
            //Bu kontrol de hata var yalnız çünkü bu kontrol tamamen verinin sırıfdan gelmesine göre yapılmış ama people verisi bir önceki fetch den gelen verilerle dolu olabiliyor ve dolayısı ile yeni fetchimiz gelene kadar o hazırdaki bir önceki fetch ile çekilen veri içindeki elemanı karşımıza getirior ve bizim fetch bitince de diğerini getiriyor bundan dolayı karşımızdaki bilgiler 2 farklı bilgi olarak gelebiliyor bunu düzeltelim bu önemli....
            // <li >  </li>
            //Burda Object.values ile diziye çevirip döndüremezmiyiz ya da for of ile direk obje içinde döndüremezmiyiz...

            <div key={index} className="col-md-4">
              {
                //Bu verileri bu şekilde yazdırdığımız zaman mesela region yani ülkeye göre seçmek istediğimi zaman eğer o ülkeden bir person bulamazsa o zaman people[index].photo da undefined gelip bizim programımızı bozabilir ondan dolayı burda da eğer seçtiğimiz ülke de person varsa bunu getir person yoksa da aradığınız ülkede person yoktur yaz demeliyiz...
              }
              {people[index].photo !== "undefined"}
              <img src={people[index].photo} alt={people[index].name} /> <br />
              <h2> {people[index].name}</h2>
              <div
                style={{
                  border: "1px solid ",
                  backgroundColor: "cyan",
                  padding: "10px"
                }}
              >
                {people[index].surname}
                <br /> {people[index].gender}
                <br /> {people[index].region}
                <br /> {people[index].email}
                <br /> {people[index].birthday.dmy}
              </div>
            </div>
          ) : (
            <h2>Press Spacebar!</h2>
          )}
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}

export default App;

/* 
 <option>Afrikanns</option>
  <option>Albanian</option>
  <option>Arabic</option>
  <option>Armenian</option>
  <option>Basque</option>
  <option>Bengali</option>
  <option>Bulgarian</option>
  <option>Catalan</option>
  <option>Cambodian</option>
  <option>Chinese (Mandarin)</option>
  <option>Croation</option>
  <option>Czech</option>
  <option>Danish</option>
  <option>Dutch</option>
  <option>English</option>
  <option>Estonian</option>
  <option>Fiji</option>
  <option>Finnish</option>
  <option>French</option>
  <option>Georgian</option>
  <option>German</option>
  <option>Greek</option>
  <option>Gujarati</option>
  <option>Hebrew</option>
  <option>Hindi</option>
  <option>Hungarian</option>
  <option>Icelandic</option>
  <option>Indonesian</option>
  <option>Irish</option>
  <option>Italian</option>
  <option>Japanese</option>
  <option>Javanese</option>
  <option>Korean</option>
  <option>Latin</option>
  <option>Latvian</option>
  <option>Lithuanian</option>
  <option>Macedonian</option>
  <option>Malay</option>
  <option>Malayalam</option>
  <option>Maltese</option>
  <option>Maori</option>
  <option>Marathi</option>
  <option>Mongolian</option>
  <option>Nepali</option>
  <option>Norwegian</option>
  <option>Persian</option>
  <option>Polish</option>
  <option>Portuguese</option>
  <option>Punjabi</option>
  <option>Quechua</option>
  <option>Romanian</option>
  <option>Russian</option>
  <option>Samoan</option>
  <option>Serbian</option>
  <option>Slovak</option>
  <option>Slovenian</option>
  <option>Spanish</option>
  <option>Swahili</option>
  <option>Swedish </option>
  <option>Tamil</option>
  <option>Tatar</option>
  <option>Telugu</option>
  <option>Thai</option>
  <option>Tibetan</option>
  <option>Tonga</option>
  <option>Turkish</option>
  <option>Ukranian</option>
  <option>Urdu</option>
  <option>Uzbek</option>
  <option>Vietnamese</option>
  <option>Welsh</option>
  <option>Xhosa</option>

*/
