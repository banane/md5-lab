import { useRef, useEffect } from 'react';

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data, sections) {
  const sectionListData = sections.map(sectionName => {
    let newSection = {};
    newSection["title"] = sectionName;
    newSection["data"] = data.filter((r) => { 
      return r.category == sectionName
    }).map((menuItem) => {
      return { id: menuItem.uuid, price: menuItem.price, title: menuItem.title};
    })
    return newSection;
  });
  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
