var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("ui/search-bar/search-bar-common");
function onTextPropertyChanged(data) {
    var bar = data.object;
    bar.ios.text = data.newValue;
}
common.textProperty.metadata.onSetNativeValue = onTextPropertyChanged;
require("utils/module-merge").merge(common, exports);
var UISearchBarDelegateImpl = (function (_super) {
    __extends(UISearchBarDelegateImpl, _super);
    function UISearchBarDelegateImpl() {
        _super.apply(this, arguments);
    }
    UISearchBarDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    UISearchBarDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    UISearchBarDelegateImpl.prototype.searchBarTextDidChange = function (searchBar, searchText) {
        this._owner._onPropertyChangedFromNative(common.textProperty, searchText);
        if (searchText === "" && this._searchText !== searchText) {
            this._owner._emit(common.knownEvents.clear);
        }
        this._searchText = searchText;
    };
    UISearchBarDelegateImpl.prototype.searchBarCancelButtonClicked = function (searchBar) {
        searchBar.resignFirstResponder();
        this._owner._emit(common.knownEvents.clear);
    };
    UISearchBarDelegateImpl.prototype.searchBarSearchButtonClicked = function (searchBar) {
        searchBar.resignFirstResponder();
        this._owner._emit(common.knownEvents.submit);
    };
    UISearchBarDelegateImpl.ObjCProtocols = [UISearchBarDelegate];
    return UISearchBarDelegateImpl;
})(NSObject);
var SearchBar = (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        _super.call(this);
        this._ios = new UISearchBar();
        this._delegate = UISearchBarDelegateImpl.new().initWithOwner(this);
        this._ios.delegate = this._delegate;
    }
    Object.defineProperty(SearchBar.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return SearchBar;
})(common.SearchBar);
exports.SearchBar = SearchBar;
