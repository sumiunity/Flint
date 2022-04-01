/**
 * Menu Components
 * =================
 *
 * wraps all menu components into a single class to make
 * it easier to access these components during development
 *
 * @author Nik Sumikawa
 * @date Nov 5, 2020
 */



import SearchMenu from './Search'
import DropdownMenu from './Dropdown'
import {HorizontalDateMenu, VerticalDateMenu} from './Date'

export class MenuComponents{

  get Search(){ return SearchMenu }
  get Dropdown(){ return DropdownMenu }
  get HorizontalDate(){ return HorizontalDateMenu }
  get VerticalDate(){ return VerticalDateMenu }

}

export default MenuComponents
