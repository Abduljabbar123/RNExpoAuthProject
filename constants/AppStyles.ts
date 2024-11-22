import { StyleSheet} from 'react-native';
import { AppFonts, normalized} from '@/constants/AppConstants';
import { Colors } from '@/constants/Colors';

export const AppStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.whiteFamily.white,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: Colors.whiteFamily.white,
  },
  topSafeAreaViewDrawerModel: {
    flex: 0,
    backgroundColor: Colors.blackFamily.black,
  },
 
});
