/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function controlla(id, blocco){
    let leng=parseInt(choisenBlocks.length);
    for(let i=0; i<leng; i++){
        if(choisenBlocks.length===3 && choisenBlocks[0]!==choisenBlocks[1] && choisenBlocks[0]!==[2] && choisenBlocks[1]!==choisenBlocks[2] && choisenBlocks[2]!==choisenBlocks[0]) 
            return;
        else{
            for(let j=1; j<=i; j++){
                if(choisenBlocks[j]===id){
                choisenBlocks.splice(i,1);
                choiceId.splice(i,1);
                deselezione(id);
                }
            }
        }
    }
    blocco.removeEventListener('click', controlla);
}

function comando(event){
    const blocco=event.currentTarget;
    if(choisenBlocks==''){
        deselezione(blocco.dataset.questionId);
        selezione(blocco);
        choisenBlocks.push(blocco.dataset.questionId);
        choiceId.push(blocco.dataset.choiceId);
        controlla(blocco.dataset.questionId,blocco);
        console.log(choiceId);
    }else{ 
        if(parseInt(choisenBlocks.length)<3){
            choisenBlocks.unshift(blocco.dataset.questionId);
            choiceId.unshift(blocco.dataset.choiceId);
            controlla(blocco.dataset.questionId,blocco);
            deselezione(blocco.dataset.questionId);
            selezione(blocco);
            console.log(choiceId);
            if(parseInt(choiceId.length)===3) result();
        }
    }
    removeEventListener('click', comando);
}

function result(){
    //ricordiamo che i valori sono inseriti con unshift
    let risultato;
    if(choiceId[0]===choiceId[1] || choiceId[0]===choiceId[2])risultato=choiceId[0];
    if(choiceId[1]===choiceId[2]) risultato=choiceId[1];
    if(risultato===undefined)risultato=choiceId[2];
    console.log(risultato);
    complete(risultato);
}

function complete(risultato){
    const resultContainer=document.querySelector('.beforeComplete');
     resultContainer.classList.add('risultato');
    resultContainer.classList.remove('beforeComplete');
    const title=document.querySelector('.risultato .titolo h1');
    const testo=document.querySelector('.risultato .testo');
    for(let key in RESULTS_MAP)
        if(key===risultato){
            title.textContent=RESULTS_MAP[risultato].title;
            testo.textContent=RESULTS_MAP[risultato].contents;
        }
}


function deselezione(id){
    if(id==="one"){
        const img= document.querySelectorAll("#one .checkbox");
        const blocc=document.querySelectorAll("#one div")
        for(let image of img)
            image.src="./images/unchecked.png";
        for(let block of blocc){
            block.classList.remove('checked');
            block.classList.add('unchecked');
        }
    }
    if(id==="two"){
        const img= document.querySelectorAll("#two .checkbox");
        const blocc=document.querySelectorAll("#two div")
        for(let image of img)
            image.src="./images/unchecked.png";
        for(let block of blocc){
            block.classList.remove('checked');
            block.classList.add('unchecked');
        }
    }
    if(id==="three"){
        const img= document.querySelectorAll("#three .checkbox");
        const blocc=document.querySelectorAll("#three div")
        for(let image of img)
            image.src="./images/unchecked.png";
        for(let block of blocc){
            block.classList.remove('checked');
            block.classList.add('unchecked');
        }
    }
}

function AllUnchecked(){
    const resultContainer=document.querySelector('.risultato');
    resultContainer.classList.remove('risultato');
    resultContainer.classList.add('beforeComplete');
    const blocco=document.querySelectorAll('.choice-grid div')
    const img=document.querySelectorAll('.choice-grid .checkbox');
    for(let image of img){
        image.src="./images/unchecked.png";
    }
    for(let block of blocco){
        block.classList.remove("unchecked");
        block.classList.remove("checked")
    }
    for(let i=0; i<3; i++){
        choiceId.pop();
        choisenBlocks.pop();
    }
}

function selezione(blocco){
    const image= blocco.querySelector('.checkbox');
    image.src="./images/checked.png";
    blocco.classList.remove('unchecked');
    blocco.classList.add('checked');
    blocco.removeEventListener('click', selezione);
    
}

//l'idea è che io posso fare una list dove metto i blocchi scelti. Devo fare in modo che la lista dei blocchi scelti abbia tre valori
//e che questi valori abbiamo question-id diversi, quando i question-id sono uguali viene rimosso dalla lista il question-id e viene inserito quello nuovo.
//mi serve anche una lista che deve contenere i vari choice-id
const choisenBlocks=[]; //contiene i question-id
const choiceId=[]; //contiene i choce-id;
const blocchi = document.querySelectorAll('.choice-grid div');
for (let blocco of blocchi){
    blocco.addEventListener('click',comando);
}
const button=document.querySelector('.button');
button.addEventListener('click', AllUnchecked);