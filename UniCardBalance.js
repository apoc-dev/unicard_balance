var card = args.widgetParameter
if(config.runsWithSiri){  
    card=args.shortcutParameter
}
let url = `https://topup.klarna.com/api/v1/STW_MUNSTER/cards/${card}/balance`;
let mensaURL = "https://muenster.my-mensa.de";

let r = new Request(url);
let body = await r.loadJSON();
if(config.runsInWidget){
    let w = new ListWidget()
    w.backgroundGradient = createGradient("#0d324d", "#7f5a83");
    let text = (body.balance/100).toFixed(2)+"€"  
    let title = "Balance"
    let titleW = w.addText(title)
    w.addSpacer(30)
    let txtW = w.addText(text)  
    txtW.centerAlignText()
    txtW.font = Font.boldSystemFont(28);
    txtW.textColor = Color.white();
    
    titleW.centerAlignText()
    titleW.font = Font.boldSystemFont(12);  
    titleW.textColor = Color.white()
    Script.setWidget(w)
}
else{

    if(config.runsWithSiri){
        Speech.speak("Guthaben ist " + (body.balance/100).toFixed(2)+"€");
    }
    else{
        Safari.open(mensaURL);
    }
}
Script.complete();

function createGradient(from, to){
    let g = new LinearGradient();
    g.locations = [0,1];
    g.colors = [new Color(from), new Color(to)];
    return g;
}