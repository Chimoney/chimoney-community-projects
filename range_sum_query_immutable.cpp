#include <bits/stdc++.h>
using namespace std;

class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& nums) {
        prefix.push_back(0);
        for (int num : nums) prefix.push_back(prefix.back() + num);
    }

    int sumRange(int left, int right) {
        return prefix[right+1] - prefix[left];
    }
};

int main() {
    vector<int> nums = {1,2,3,4};
    NumArray obj(nums);
    cout << obj.sumRange(1,3) << endl; // 2+3+4=9
    return 0;
}
