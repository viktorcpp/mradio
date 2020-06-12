
'use strict';

import "core-js";
//import "regenerator-runtime/runtime";
import MRadio from './MRadio';

function Main(e)
{
    window.mradio = new MRadio();

} // Main


function OnLoaded(e)
{
    window.mradio.Init();

} // OnLoaded


window.addEventListener( "DOMContentLoaded", Main );
window.addEventListener( "load",             OnLoaded );

