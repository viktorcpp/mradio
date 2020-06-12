
export default class MRadio
{
    constructor()
    {
        this.options                              = {};
        this.options.selector                     = "input[type=radio]";
        this.options.mradio_fake                  = "mradio-fake";
        this.options.mradio_fake_checked          = "mradio-fake-checked";
        this.options.mradio_fake_disabled         = "mradio-fake-disabled";
        this.options.mradio_fake_checked_disabled = "mradio-fake-checked-disabled";
        this.options.mradio_processed             = "mradio-processed";

    } // constructor


    SetChecked( check )
    {
        this.checked = check;
        window.mradio._ProcessEl( this );

    } // SetChecked


    SetDisabled( disable )
    {
        this.disabled = disable;
        window.mradio._ProcessEl( this );

    } // SetDisabled


    Init( new_options = null )
    {
        let _radio_list = [];
        let _options    = Object.assign( this.options, this.options || new_options );

        _radio_list = Array.from( document.querySelectorAll( _options.selector + ":not(."+_options.mradio_processed+")" ) );

        _radio_list.forEach((_el)=>
        {
            let _div       = document.createElement("div");
            let _classname = _options.mradio_fake;

            _el.parentNode.insertBefore( _div, _el );
            _div.appendChild(_el);
        
            if( _el.checked )
            {
                _classname = _el.disabled ? _options.mradio_fake_checked_disabled : _options.mradio_fake_checked;
            }
            else
            {
                _classname = _el.disabled ? _options.mradio_fake_disabled : _options.mradio_fake;
            }

            _div.classList.add(_classname);
            _div.classList.add(_options.mradio_processed);
            _el.classList.add(_options.mradio_processed);

            _el._loop = Object.create(null);
            _el._loop.options = _options;

            _el.addEventListener( "change", function(){ window.mradio._ProcessEl( this ); } );
            _el.SetChecked  = this.SetChecked;
            _el.SetDisabled = this.SetDisabled;

        });

    } // Init


    _ProcessEl( _el )
    {
        let _group     = Array.from( document.querySelectorAll("input[name="+_el.name+"]") );
        let _options   = _el._loop.options;
        let _classname = _options.mradio_fake;
    
        _group.forEach((_el)=>
        {
            window.mradio._ClearClassList(_el);

            if( _el.checked )
            {
                _classname = _el.disabled ? _options.mradio_fake_checked_disabled : _options.mradio_fake_checked;
            }
            else
            {
                _classname = _el.disabled ? _options.mradio_fake_disabled : _options.mradio_fake;
            }

            _el.parentNode.classList.add(_classname);

        });

    } // _ProcessEl


    _ClearClassList(_el)
    {
        let _options = _el._loop.options;
        _el.parentNode.classList.remove( _options.mradio_fake,
                                         _options.mradio_fake_checked,
                                         _options.mradio_fake_disabled,
                                         _options.mradio_fake_checked_disabled );

    } // ClearClassList


} // class MRadio
