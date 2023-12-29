//HOOKS
import { useCallback, useEffect, useMemo, useState, useRef, createContext, useContext } from 'react'
// Import the Slate editor factory.

// UTILITIES
import Button from './Button'
import TextEditorRenderer from './TextEditorRenderer';

//Create Context
export const G_Data = createContext();

//ExtraFunc/Comp
function TextEditorPlate(Option){
    //** Use Context */
    const {TextNode, MainEditor, Padding, Size, StateColor, BgColor  } = useContext(G_Data);

    //** Render */
    return <div
        tabIndex={0}
        ref={MainEditor}
        className={`relative ${Padding} ${Size} rounded outline outline-1 outline-${StateColor} outline-offset-0 shadow-myBox3 shadow-${StateColor} delay-100 focus:outline-2 focus:outline-offset-2 focus:outline-${StateColor}/80  placeholder:font-light ${BgColor}  shrink min-h-[30px]`}
        onInput={(event)=>{
            //console.log(event);
            console.log(window.getSelection());///////////////////////////////////////////////////
        }}
        onKeyDown={(event)=>{
            //console.log(event.key);
            if(event.key){

            }
        }}
        onKeyUp={(event)=>{
            //console.log(event);
        }}
        contentEditable
        style={{
            wordBreak: 'break-all',
            overflowWrap: 'break-word',

        }}
    >
        {Option.children}
    </div>
}


//Main
export default function TextEditor(Option) {
    //** STRUCT */
    let Handler = Option.Handle;
    let ErrorBag = Option.ErrorBag;
    let Padding = Option.Padding ?? "py-1 px-4";
    let Size = Option.Size ?? "min-w-[24rem]";
    let BgColor = Option.BgColor ?? "bg-white";

    //**>> Use State */
    const [v_textNode, e_textNode] = useState([{type:"text", content:"ff"}]);

    //**<< Use State */

    //**>> MEMOIZONE
    const Placeholder = useMemo(()=>{
        return Option.Placeholder;
    }, [Option.Placeholder]);

    const Dynamic = useMemo(()=>{
        return Option.Dynamic ?? false;
    }, [Option.Dynamic]);

    const UpdateHandler = useCallback((value)=>{ // Insert the New Value to handler when stuff gets updated
        if(!Dynamic){
            Handler[1](value);
            return true;
        }

        function domainExpansion(energy, limitless, voided){ // Traverse through depth by 1 or infinitely;
            // THIS WILL REQUIRE A MASSIVE AMOUNT OF ENERGY(memory) BE CAREFUL;
            // energy - the Full Object/Array; Limitless is the array to traverse; Voided is the value to insert at the end of limitless;
            if(limitless.length < 1){
                return voided;
            }
            //-------------------------------------Traverse Next Arr/Obj---Reduce the limitless by 1----ValueNeededToInsert
            energy[limitless[0]] = domainExpansion(energy[limitless[0]], limitless.filter((x,i)=>i!=0) || [], voided);
            return energy;
        };

        Handler[1]((prev)=>{
            let restructPrev = structuredClone(prev);
            restructPrev = domainExpansion( restructPrev, Dynamic.split("."), value );
            return restructPrev;
        });
    }, [Option.Dynamic, Option.Handle]);

    const StateColor = useMemo((value)=>{
        if(ErrorBag){
            return 'red-400';
        }else{
            return 'black';
        }
    }, [ErrorBag]);

    const renderedContent = useMemo(()=>{
        return <TextEditorPlate>
            <TextEditorRenderer TextNode={v_textNode} />
        </TextEditorPlate>;
    }, [v_textNode]);

    //**<< MEMOIZONE

    //** Use Ref */
    const MainEditor = useRef();

    //** REENDER */
    return <G_Data.Provider value={{
        TextNode:[v_textNode, e_textNode],
        MainEditor:MainEditor,
        Padding: Padding,
        Size: Size,
        StateColor: StateColor,
        BgColor: BgColor,
    }}>
        {renderedContent}
    </G_Data.Provider>
}

/*
::,.            ..',;;;;;:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::;'..           ..:cccccc:cccccccccccccccccccccccc:::::::
K0k,           .'coxOO0000KKKKKKKKKKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKKKKKKKKK0kl'         ...;ONNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXXXXX
::c.            .:oxk00KKKKKKKKXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXXKKXKKKKkc.   .    ...,ONNNNNNNNNNNNNNNNNNNNNNNNXXXNNNNNNNNNNN
c,.            .,ldxkO00KKKKKKXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXKKKKKKXXKKKKKKK0x,.       .;;oKXXNNNNXNNXXXXXXXXNNNNNNNNNNNNNNNNNNNNN
0xc'.          .:oxkkO00KKKKKKXXXXXXXXNXXNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXK0OOOkkkkkkOOkxxk00KKKKKKKOl.    . .:O0KXXXNNXXXNNNNNNXNNNNNNNNNNNNNNNNNNNNNNNN
0Oo;.          'lxkkkOO00KKKXXXXXXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNXXXK0kdc;',;:ldxkO000OkxxkkO0KKKK0d'     .:xOKXXXNNNNNNNNNNNNNXNNNNNNNNNNNNNNNNNNNNNNN
KOo,          .;okkOkOO000KKKKXXXXXXXXXNNXXXXNNNNNNNNNNNNNNNNXXXXK0OxolccldxkO00KKKKKK000OOO0KKKKKk:.   .ck0KKXNNNNNNNNNNNNNNNNXXKKXNXNNNNNNNNNNNNNNNN
K0k:. ...     .:dkkkkkO0OkkkkkkkxdxxxxkxxkO0KKXXXXXXXXNNNNNXXXXK00OOkxdodkOOOOkkxdodkO00000000KKKK0o.  .lO0KXXXNNNNNNNNNNNNXK0XX0OO0XNNNNNNNNNNNNNNNNN
KK0d,..cc.     ;dkkkkdoolccc;,;;,''......';coxO0KKXXXXXNNNXXXKK0000OxdolccoxoclodxxddxkO00KKKKKKKK0x,..;kKKXXXXXNNNNNNNNNNNKkx0XKOO000XNNNNNNNNNNNNNNN
KK0Ol,'cc'.    'oxkxdc;;::cc:cllllllc;,'',;:oddxkO0KXXXNNNNXXKKKKKK0Okx:..,;,..,oc:lxOO000KKKKKKKKKx;..lKXXXXXXXNNNNNNNNXNNXK0KKXXK0kx0O0NXXNNXXNNNNNN
XKK0x;.;c'..   .lxxxdlclloodolc:;,'..... .';loxxxkO0XXNNNNNXXXKKXXX0O0X0xdxxxolkKOxddk0KKKKXXKKKKXKd;',dKXXXXXXNNNNXXNNNXXXNXXOxkO00dxxco0XXXXNXXXXXXX
XXKKk;.,:,.,.  'lxxxoloddddo:,'..;;..,;,'cxdloO0OOO0KXNNNNNXXXXXXNXKXXXXXKKKK0KK00000KKXXXXXXXXKXXKxllxOKXXXKXNNNNXXXNNNNXNXNXkx0KOxdkd:lOXXXXXXXXXXXX
XKOkd,'';:;c;..,lxkxdddxxddo:'.'ckOdok00OKXKkkKXXK000XXNNNNXXXXXXNNXXXKKKKKXKKKKKKKXXXXXXXXXXXXXKXKOdkKKKXXXKXNNXXXXXXNNXXNXNXkxKXXKxxxllOXXXXXXXXXXXX
KKOdc,:c,;loc. 'lxkkxxkkkkkkxoldxO00KKXXXXXXXXXXXK00KXXNNNNNXXXXXXNNXXXXXXXXXXXXXXXXNNNXXXXXXXXKKKKOk0KKXXXKXXNNNNXXXXXNNXXNXXOodKXXK0Ol;dKXXXXKKKKKKK
KKKK0xodc;lo:. .cxkkkO0000000OO0000KKKKKKXXXXXXXXKK0KXXNNNNNXXXXXXNNNNNNNNXNNNXXXNNNNNNXNNXXXXXKKKK0OKKXXXKKXNXNNNNXXXXXXXXXXXKd:dKXXXKk:,dKKKKKKKKKKK
00KXKOdxx:,lc. .;dkkOO0KKKKKKXKKKKKXXXXXXXXXXXXXXKKKKKXNNNNNXXXXXXXXNNNNNNNNNNNNNNNNNNNNNXXXXXXKKK000KXXXXXXXNNNNNXXXXXXXXXXXXXKxc:ok00l,,,cx000000000
O0KKOookko';o,.';lxkkO0KKKXXXXXXXXXXXXXXXXXXXXXXKKKKKKXXNNNNNXXXXXXXNNNNNNNNNNNNNNNNNXXXXXXXXXXKKKOO0XXXXXXXXNNNNNXXXXXXXKKKKKK0Oo;,;::,,:;'':lxkkkkkO
k0K0l'oOkd:':l:,,:dxkOO0KKXXXXXXXXXXXXXXXXNXXXXXKKKKKKXXXNNNNXXXXXXNNNNNNNNNNNNNNNNNNXXXXXXXXXXKK0OOKXXXXXXXXNXXNNXXXXXXKK000Okxd:,cldkkkOkxxxk0KKKKKK
OK0O;.:xxxd;':dl;,cdxOO0KKKKXXXXXXXXXXXXNNXXXXXXKKKKKKXXXNNNNNXXXXXXXNNNNNNNNNNNNNNNNXXXXXXXXXKK0000XXNXXKXXXXXXXXXXXXKK0OOOOOOO00KKXXXXXXXXXXNXXXXXXX
0KOl. .:oddo;:dxdc:oxkO0KKKKKXXXXXXXXXXXXXXXXXXXKKKKKKXXXNNNNNXXXXXXXXNNNNNNNNNNNNNNNXXXXXXXXXKK00O0XXK00KXXXXXXKKK00OOOO000KKKKKKKXXXXXXXXXXXXXXXXXXX
0k:.   .';ldlcoxxdc:okO00KKKKXXXXXXXXXXXXXXXXXXKKKKKKXXXNNNNNNNXXXXXXXNNNNNNNNNNNNNNNNXXXXXXXXK000dclooxOKXXXXXK0kxxkkkOOOOO0000000KKKKKKKKKKKKKKKKXXX
d:.       'lolldxd:,cxO00KKKKXXXXXXXXXXXXNXXNXXKKKKKKXXXNNNNNNNXXXXXXXXNNNNNNNNNNNXXNNNXXXXXXKKKK0l..;oO0KXXXK0xoloodddxxxkkkkOOOOOO000000000KKKKKKKKK
..         .;cccodo::oxO0KKKKKXXXXXXXXXXXXXXNXXKKKKKKKXXNNNNNXXKKKKKKXXNNNNNNNNNNNXXXXXXXXXXKKKKK0l,:dk00KKKOxl:::ccclllooodddxxxxkkkkkkOOOOOO00000000
            ..,:;:lc:ldkO0KKKKKXXXXXXXXXXXXXXXKOkOOOkxk0KXXXXKkllddxOXNXNNNNNNNNNNNXXXXXXXXXXKKKK0dldkO00Okoc;;;;;;;:::::cclllloooddddxxxxxxkkkkkkkOOO
              ..,;;;;cdxkO0KKKKKXXXXXXXXXXXXXXXOo:c:,',lkO00OxlclodOKXXNNNNNNNNNNNNNXXXXXXXXXXXKKKkxkOkkdl;,,,,,;;;;;;;;:::::ccccclllloooooddddddxxxxx
                ..',;cdxkkO0KKKKKKXXXXXXXXXXXXXX0xoolooodxxxkkO0KKXXXXXNXNNNNNNNNXXXXXXXXXXXXXXXKKOxxdl:,,',,,,;;;;;;;;:::::::::::cccccccllllllloooooo
                   ..;oxkkkO00KKKKKXXXXXXXXXXXXXXXKKK00OkxxkOKXXXXXXNNXXXXNNNNNXXXXXXXXXXXXXXXXXKKkoc;'''',,,,,,;;;;::::ccccccllllllllllllllllllllllll
                     .ckkOOOO000KKKKXXXXXXXXXXXXXXXXXXXXKKKKKXXNNNNNXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKx;...'''',,,,;::ccllooodddddddxxxxxxxxddddddddoooooo
                      ;xOOOOOO000KKKKXXXKKXXXKKXXXXXXXXNNXXXXXXXXXXXXKKK0OO0KXXXXXXXXXXXXXXXXXXXKKo....''',;;:clooddxxkkkkkOOOOOOOOOOOOOOOOOkkkkkkkxxx
....                  'dOO0O000O00KKKXKKK0kxddxkkkxxxxxxkkkkkxdooooddxxkkO0KXXXXXXXXXXXXXXXXXXXXK0c....',;:clodxxkkOO00000000KKKKKKKK000000000000OOOOO
,,,''.....            .cOO00000OO0KKXXXXKK0kdlccccloooodddddxxkkkkO000KKXXXXXXXXXXXXXXXXXXXXXXXKKk;..',;clodxkOO000KKKKKKKKXXXXXXXXXXXKKKKKKKKKKKKKKK0
oolllcc:;'...          'dOO00000OOO0KXXXXXXXXXKKKKKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKXXXXXXXXXKK0o'',:codxkO00KKKKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
kkkkxxxdol:;'..         ;xOO00000OOO0KXXXXXXXXXKKKKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKK00d::coxkkO00KKKXXXXXXXXXXXXXXXXXXXXXXXXXNNNNNNNNNNXXXN
000OOOOOkxdoc;'.         ;xOO000000O00KXXXXXXXXXKKKKKKKKKKKKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKK0OOO0kxxkO00KKKXXXXXXXXXXXXXXXXXXXNNNNNNNNNNNNNNNXXXXXXXN
KKKKK0000OOkdlc,..        ,dkO000000O0KKKKXXXXXXKKKKKXXKKKKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKKOkkOOOK0O0KKKXXXXXXXXXXNNXXXXXXNNNNNXXNNNNNNNNNNNNXXNNXXXX
XXXXXXXXXXKK0Okxo;..       .:xOO00000000KKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKKKOkxxkOkOKKKKKXXXXXXXXNNNNXXXXXXXNNNNNXXXXNNNNNNNNNNNNNNNNXXN
XXXXXXXXXXXXXXXXK0kd:'.      .:dkOO0O0000KKKXXXXXXXXXXXXNNNNNNNNNNNNNXXXXXXXXXXXXXXXKKK0OxdddkOkk0XXKXXXXXXXXXNNNNNNXXXXNNNNNNNXXXXNNNNNNNNNNNNNNNNNNN
XXXXXXXXXXXXXXXXKKK0ko,.       .,ldkOO000KKKKXXXXXXXXXXXNNNNNNNNNNNNNNXNNXXXXXXXXXKKK0kdoodxkkkk0XXXXXXXXXXXNNNNNNNXXXXNNNNNNNNXXXNNNNNNNNNNNNXXXNNNNN
XXXXXXXXXXXXXXXXXKK0ko,.        ..'cdkOOO00KKKKXXXXXXXXNNNNNNNNNNNNNNNXNXXXXXXXXKKK0kxooodxkOkk0XXXXXXXXXXXXXNNNNNNXNNNNNNNNNNXXXXNNNNNNNNNNNXXXNNNNNN
NNXNNXXNNXXXXXXXXKK0ko'         .'..,coxkOO00KKKKXXXXXXXNNNNNNNNNNNXXXXXXXXXXXKKK0kdooodxkkkk0XXXXXXXXXXXXKKXXXNNXXNNNNNNNNNNNXXXNNNNNNNNNNNNNNNNNNNNN
NNNNNXXNNXXXXXXXXXK0kc.        .':,...,:ldxkO0KKKXXXXXXXXNNXXXXXXXXXXXXXXXXKKK0OxollodxxxkO0KXXXXXXXXXXXXXKKKKXXXXNNNNNNNNNNNNXXXNNNNNNNNNNNNNNNNNNNNN
XNNNXXNNXXXXXXXXXXK0o.         .,:c,. ..,;cldkO00KKKKXXXXXXXXXXXXXXXXXXXKKKK0koccllodxkkO0XXXXNXXXXXXXXKXXXKKKXXNNNNNNNNNNNNNXXXNNNNNNNNNNNNNNNNNNNNNN
XXXNXXNXXXNXXXXXXXKx'   ...    .;:cc;.  ..'',:ldkO000KKKKKKKKKKKKKKKKKK0Okxdoc::clloxkOKXXXNNNNXXXXXXXXKXXNXXXNNNNNNNNNNNNNNNXXNNNNNNNNNNNNNNNNXXNNNNN
dXNNXNNNXNXNNXXXKKx,   'oo;.  .;clllc:'.   ...',;cldxkkOOOOOOOOOOOOOOkxdoc:::;;;:coxOKXNNNNNNNNNXXXXXXXXXXNNXXNNNNNNNNNNNNNNXXXNNNNNNNNNNNNNNNNXXNNNNN
:kXNNNNNNXXNXXXX0o'   .cOOl. .:odddddoc;..    .....',;:clllooooloodoolc::;,''..;lx0XXXNNNNNNNNNNXXXXXXXXXNNXNNNNNNNNNNNNNNNNXXNNNNNNNNNNNNNNNNNNNNNNNN
llKNNNNNNXNNXXNKl.    .oO0d..ldxkkkkkxdoc;..      ....',;;:clccccllcc:,......'ckKXXXNNNNNNNNNNNNNXNXXXXXXNNNNNNNNNNNNNNNNNNNXNNNNNNNNNNNNNNNNNNNNNNNNN
OcxXXNNNNNNNXXNO'     .cOKOccxOOOOOOOOOkxdl:..        ..',;;:ccc:;;,'.   .;coOKXXXXNNNNNNNNNNNNNNNXXXXXXXNNNNNNNNNNNNNNNNNNXNNNNNNNNNNNNNNNNNNNNNNNNNN
XocONXNNNNNNNXN0:. ..'.,kKKOxk00000000000Okxo:'.         ..........   .'cx0KKXXXXNNNNNNNNNNNNNNNNNXXXXXXXNNNNNNNNNNNNNNNNNXXNNNNNNNNNNNNNNNNNNNNNNNNNN
X0clKNNNNNNNNXXKOdlldxc:kKXK0O0000KKKKKK0000Oxoc,..                .':dOKKXXXXXNNNNNNNNNNNNNNNNNNXXXXXXXXNNNNNNNNXXNNNNNNNXNNNNNNNNNNNNNXXNNNNNNNNNNNN
XXx:xXXNNNNNXXXXKKK000kdOXXXXK00KKKKKKKKKKKKK00Okdl:;'....      .,cdO0KXXXXXXNNNNNNNNNNNNNNNNNXXXXXXXXKXXNNNNNNNXXXNNNNNNXNNNNNNNNNNNNXXXNNNNNNNNNNNNX
XXKol0XXNNNNXXXXXXXKKK0kOKXXXXK0KKKKKKKKKKKKKKKK000OOd;'....',clood0XXXXXXNNNNNNNNNNNNNNNNNNNXXXXNNNNXXXNNNNNNNXXXXNNNNNNXNNNNNNNNNNNNXNNNNNNNNNNNNNXX
NXXkcxXXNNNNXXXXXXXXKKKOOKXXXXXKKKKKKKKKKKKXXXXXKKXOl...;cccccccc,.'oOXNNNNNNNNNNNNNNNNNNNNNNNNNXNNNNXXNNNNNNNXXXXNNNNNNXXNNNNNNNNNNNNNNNNNNNNNNNNNXXX
NNXKol0NNNNNXXXXXXXXXXK0OKXXNXXXKKKKKXXXXKXXXXXXXKx'.;loc;.....'ol'  .cONNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXNNNNNNXXXXXNNNNNXXNNNNNNNNNNNNNNNNNNNNNNNNXXXXX
NNXXklkXNNNNNXXXXXXXXXXKO0XXNXNXXXXXXXXXXXXXXXXXKl. ,kOxl' ':;..oddl'  .:ONNNNNNNNNNNNNNNNNNNNNNNNNNXXNNNNNNXXXXXNNNNNNXXNNNNNNNNNNNNNNNNNNNNNXXXXXXXN
XXXX0odKNNNNNNXXXXXXXXXXO0XXNXNNXXXXXXXXXXXXXXXO;   .;k0Ol......',',.    .:dOXNNNNNNNNNNNNNNNNNNNNNXXNNNNNNXXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNXXXXXXXXX
XXXXKxlOXXXXXXXXXXXXXXXX00KXXXXXXXXXXKKKXKKXXXk,     .:lc;'...              .:kXNXXXXXXXXXXXXXXXXXXXXXXXXXXXKKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXKXXXXKKKK
c::::;',:::ccc:::::::::c:;::::::::::::::::::::.      .....                    .;cccccccccccccccc:::::c:ccc::::::ccccc:::::::::::cc:::cccccc::::c::::::
⠀⠀⠀⠀⠀⠀⠀⠀⠀
*/
