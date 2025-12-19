import { TopicContent } from '../topicContents';

export const backtrackingContent: TopicContent = {
  id: 'backtracking',
  definition: 'Backtracking is an algorithmic technique that explores all possible solutions by incrementally building candidates and abandoning ("backtracking" from) a candidate as soon as it determines the candidate cannot lead to a valid solution. Think of it like exploring a maze - if you hit a dead end, you go back and try a different path.',
  keyPoints: [
    'Systematic way to try all possibilities',
    'Uses recursion to explore solution space',
    'Prunes invalid paths early (constraint checking)',
    'Backtracks when current path cannot lead to solution',
    'Often used for constraint satisfaction problems',
    'Classic examples: N-Queens, Sudoku, Maze solving',
  ],
  syntax: [
    {
      language: 'C',
      code: `// Backtracking Examples in C
#include <stdio.h>
#include <stdbool.h>

#define N 4

// N-Queens Problem
int board[N][N];

bool isSafe(int row, int col) {
    // Check column
    for (int i = 0; i < row; i++)
        if (board[i][col]) return false;
    
    // Check upper-left diagonal
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;
    
    // Check upper-right diagonal
    for (int i = row, j = col; i >= 0 && j < N; i--, j++)
        if (board[i][j]) return false;
    
    return true;
}

bool solveNQueens(int row) {
    // Base case: all queens placed
    if (row >= N) return true;
    
    for (int col = 0; col < N; col++) {
        if (isSafe(row, col)) {
            // Choose: place queen
            board[row][col] = 1;
            
            // Explore: try to place rest
            if (solveNQueens(row + 1))
                return true;
            
            // Backtrack: remove queen
            board[row][col] = 0;
        }
    }
    return false;
}

// Subset Sum Problem
bool subsetSum(int arr[], int n, int target, int index, int currentSum) {
    // Base cases
    if (currentSum == target) return true;
    if (index >= n || currentSum > target) return false;
    
    // Include current element
    if (subsetSum(arr, n, target, index + 1, currentSum + arr[index]))
        return true;
    
    // Exclude current element (backtrack)
    return subsetSum(arr, n, target, index + 1, currentSum);
}

// Generate all permutations
void swap(char* a, char* b) {
    char temp = *a;
    *a = *b;
    *b = temp;
}

void permutations(char str[], int left, int right) {
    if (left == right) {
        printf("%s\\n", str);
        return;
    }
    
    for (int i = left; i <= right; i++) {
        swap(&str[left], &str[i]);       // Choose
        permutations(str, left + 1, right); // Explore
        swap(&str[left], &str[i]);       // Backtrack
    }
}

int main() {
    // N-Queens
    if (solveNQueens(0)) {
        printf("N-Queens Solution:\\n");
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                printf("%c ", board[i][j] ? 'Q' : '.');
            printf("\\n");
        }
    }
    
    // Subset Sum
    int arr[] = {3, 34, 4, 12, 5, 2};
    int target = 9;
    printf("\\nSubset with sum %d exists: %s\\n", 
           target, subsetSum(arr, 6, target, 0, 0) ? "Yes" : "No");
    
    // Permutations
    printf("\\nPermutations of ABC:\\n");
    char str[] = "ABC";
    permutations(str, 0, 2);
    
    return 0;
}`,
    },
    {
      language: 'C++',
      code: `// Backtracking in C++
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// N-Queens with all solutions
class NQueens {
    int n;
    vector<vector<string>> solutions;
    
    bool isSafe(vector<string>& board, int row, int col) {
        // Check column and diagonals above
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)] == 'Q') return false;
            if (col + (row - i) < n && board[i][col + (row - i)] == 'Q') return false;
        }
        return true;
    }
    
    void solve(vector<string>& board, int row) {
        if (row == n) {
            solutions.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'Q';    // Choose
                solve(board, row + 1);     // Explore
                board[row][col] = '.';     // Backtrack
            }
        }
    }
    
public:
    vector<vector<string>> solveNQueens(int n) {
        this->n = n;
        vector<string> board(n, string(n, '.'));
        solve(board, 0);
        return solutions;
    }
};

// Sudoku Solver
class SudokuSolver {
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == c) return false;
            if (board[i][col] == c) return false;
            if (board[3*(row/3) + i/3][3*(col/3) + i%3] == c) return false;
        }
        return true;
    }
    
public:
    bool solve(vector<vector<char>>& board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, row, col, c)) {
                            board[row][col] = c;    // Choose
                            if (solve(board)) return true;
                            board[row][col] = '.';  // Backtrack
                        }
                    }
                    return false; // No valid number found
                }
            }
        }
        return true; // All cells filled
    }
};

// Generate all subsets
void subsets(vector<int>& nums, int index, vector<int>& current, 
             vector<vector<int>>& result) {
    result.push_back(current);
    
    for (int i = index; i < nums.size(); i++) {
        current.push_back(nums[i]);      // Choose
        subsets(nums, i + 1, current, result);  // Explore
        current.pop_back();              // Backtrack
    }
}

// Combination Sum
void combinationSum(vector<int>& candidates, int target, int start,
                    vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    
    for (int i = start; i < candidates.size() && candidates[i] <= target; i++) {
        current.push_back(candidates[i]);
        combinationSum(candidates, target - candidates[i], i, current, result);
        current.pop_back();
    }
}

int main() {
    // N-Queens
    NQueens nq;
    auto solutions = nq.solveNQueens(4);
    cout << "4-Queens has " << solutions.size() << " solutions" << endl;
    
    // Subsets
    vector<int> nums = {1, 2, 3};
    vector<int> current;
    vector<vector<int>> allSubsets;
    subsets(nums, 0, current, allSubsets);
    cout << "Subsets of {1,2,3}: " << allSubsets.size() << endl;
    
    return 0;
}`,
    },
    {
      language: 'Java',
      code: `// Backtracking in Java
import java.util.*;

public class Backtracking {
    
    // N-Queens Problem
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        
        solve(board, 0, solutions);
        return solutions;
    }
    
    private void solve(char[][] board, int row, List<List<String>> solutions) {
        if (row == board.length) {
            solutions.add(construct(board));
            return;
        }
        
        for (int col = 0; col < board.length; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'Q';     // Choose
                solve(board, row + 1, solutions);  // Explore
                board[row][col] = '.';     // Backtrack
            }
        }
    }
    
    private boolean isSafe(char[][] board, int row, int col) {
        // Check column and diagonals
        for (int i = row - 1; i >= 0; i--) {
            if (board[i][col] == 'Q') return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)] == 'Q') return false;
            if (col + (row - i) < board.length && board[i][col + (row - i)] == 'Q') return false;
        }
        return true;
    }
    
    private List<String> construct(char[][] board) {
        List<String> result = new ArrayList<>();
        for (char[] row : board) result.add(new String(row));
        return result;
    }
    
    // Generate Permutations
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrackPermute(nums, new ArrayList<>(), new boolean[nums.length], result);
        return result;
    }
    
    private void backtrackPermute(int[] nums, List<Integer> current, 
                                   boolean[] used, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            used[i] = true;
            current.add(nums[i]);         // Choose
            backtrackPermute(nums, current, used, result);  // Explore
            current.remove(current.size() - 1);  // Backtrack
            used[i] = false;
        }
    }
    
    // Word Search in Grid
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (searchWord(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean searchWord(char[][] board, String word, int i, int j, int index) {
        if (index == word.length()) return true;
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return false;
        if (board[i][j] != word.charAt(index)) return false;
        
        char temp = board[i][j];
        board[i][j] = '#';  // Mark visited
        
        boolean found = searchWord(board, word, i+1, j, index+1) ||
                       searchWord(board, word, i-1, j, index+1) ||
                       searchWord(board, word, i, j+1, index+1) ||
                       searchWord(board, word, i, j-1, index+1);
        
        board[i][j] = temp;  // Backtrack
        return found;
    }
    
    public static void main(String[] args) {
        Backtracking bt = new Backtracking();
        
        System.out.println("4-Queens solutions: " + bt.solveNQueens(4).size());
        System.out.println("Permutations of [1,2,3]: " + bt.permute(new int[]{1,2,3}));
    }
}`,
    },
    {
      language: 'JavaScript',
      code: `// Backtracking in JavaScript

// N-Queens Problem
function solveNQueens(n) {
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isSafe(row, col) {
        // Check column and diagonals
        for (let i = row - 1; i >= 0; i--) {
            if (board[i][col] === 'Q') return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
            if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
        }
        return true;
    }
    
    function solve(row) {
        if (row === n) {
            solutions.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';  // Choose
                solve(row + 1);          // Explore
                board[row][col] = '.';  // Backtrack
            }
        }
    }
    
    solve(0);
    return solutions;
}

// Generate All Permutations
function permute(nums) {
    const result = [];
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);          // Choose
            const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
            backtrack(current, newRemaining);    // Explore
            current.pop();                        // Backtrack
        }
    }
    
    backtrack([], nums);
    return result;
}

// Subset Sum
function subsetSum(nums, target) {
    const result = [];
    
    function backtrack(index, current, sum) {
        if (sum === target) {
            result.push([...current]);
            return;
        }
        if (index >= nums.length || sum > target) return;
        
        // Include current element
        current.push(nums[index]);
        backtrack(index + 1, current, sum + nums[index]);
        
        // Exclude current element (backtrack)
        current.pop();
        backtrack(index + 1, current, sum);
    }
    
    backtrack(0, [], 0);
    return result;
}

// Combination Sum
function combinationSum(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);
    
    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < candidates.length && candidates[i] <= remaining; i++) {
            current.push(candidates[i]);
            backtrack(i, current, remaining - candidates[i]);  // Same element can be reused
            current.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}

// Maze Solver
function solveMaze(maze) {
    const n = maze.length;
    const solution = Array(n).fill().map(() => Array(n).fill(0));
    
    function isSafe(x, y) {
        return x >= 0 && x < n && y >= 0 && y < n && 
               maze[x][y] === 1 && solution[x][y] === 0;
    }
    
    function solve(x, y) {
        if (x === n - 1 && y === n - 1) {
            solution[x][y] = 1;
            return true;
        }
        
        if (isSafe(x, y)) {
            solution[x][y] = 1;  // Choose
            
            if (solve(x + 1, y)) return true;  // Down
            if (solve(x, y + 1)) return true;  // Right
            
            solution[x][y] = 0;  // Backtrack
        }
        return false;
    }
    
    return solve(0, 0) ? solution : null;
}

// Example usage
console.log("4-Queens solutions:", solveNQueens(4).length);
console.log("Permutations of [1,2,3]:", permute([1, 2, 3]));
console.log("Subsets summing to 9:", subsetSum([2, 3, 6, 7], 9));
console.log("Combinations for 7:", combinationSum([2, 3, 6, 7], 7));`,
    },
    {
      language: 'Python',
      code: `# Backtracking in Python

def solve_n_queens(n):
    """Solve N-Queens and return all solutions"""
    solutions = []
    board = [['.'] * n for _ in range(n)]
    
    def is_safe(row, col):
        # Check column and diagonals
        for i in range(row):
            if board[i][col] == 'Q':
                return False
            if col - (row - i) >= 0 and board[i][col - (row - i)] == 'Q':
                return False
            if col + (row - i) < n and board[i][col + (row - i)] == 'Q':
                return False
        return True
    
    def solve(row):
        if row == n:
            solutions.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'  # Choose
                solve(row + 1)          # Explore
                board[row][col] = '.'  # Backtrack
    
    solve(0)
    return solutions


def permutations(nums):
    """Generate all permutations"""
    result = []
    
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        
        for i in range(len(remaining)):
            current.append(remaining[i])          # Choose
            new_remaining = remaining[:i] + remaining[i+1:]
            backtrack(current, new_remaining)     # Explore
            current.pop()                         # Backtrack
    
    backtrack([], nums)
    return result


def subsets(nums):
    """Generate all subsets (power set)"""
    result = []
    
    def backtrack(index, current):
        result.append(current[:])
        
        for i in range(index, len(nums)):
            current.append(nums[i])      # Choose
            backtrack(i + 1, current)    # Explore
            current.pop()                # Backtrack
    
    backtrack(0, [])
    return result


def combination_sum(candidates, target):
    """Find all combinations that sum to target"""
    result = []
    candidates.sort()
    
    def backtrack(start, current, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])
            current.pop()
    
    backtrack(0, [], target)
    return result


def solve_sudoku(board):
    """Solve Sudoku puzzle"""
    def is_valid(row, col, num):
        # Check row, column, and 3x3 box
        for i in range(9):
            if board[row][i] == num or board[i][col] == num:
                return False
            if board[3*(row//3) + i//3][3*(col//3) + i%3] == num:
                return False
        return True
    
    def solve():
        for row in range(9):
            for col in range(9):
                if board[row][col] == '.':
                    for num in '123456789':
                        if is_valid(row, col, num):
                            board[row][col] = num  # Choose
                            if solve():
                                return True
                            board[row][col] = '.'  # Backtrack
                    return False
        return True
    
    solve()
    return board


def word_search(board, word):
    """Find if word exists in grid"""
    m, n = len(board), len(board[0])
    
    def dfs(i, j, index):
        if index == len(word):
            return True
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[index]:
            return False
        
        temp = board[i][j]
        board[i][j] = '#'  # Mark visited
        
        found = (dfs(i+1, j, index+1) or dfs(i-1, j, index+1) or
                 dfs(i, j+1, index+1) or dfs(i, j-1, index+1))
        
        board[i][j] = temp  # Backtrack
        return found
    
    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0):
                return True
    return False


# Example usage
print(f"4-Queens solutions: {len(solve_n_queens(4))}")
print(f"Permutations of [1,2,3]: {permutations([1,2,3])}")
print(f"Subsets of [1,2,3]: {subsets([1,2,3])}")
print(f"Combinations for 7: {combination_sum([2,3,6,7], 7)}")`,
    },
  ],
  types: [
    {
      name: 'Decision Problems',
      description: 'Find if a solution exists (N-Queens feasibility)',
    },
    {
      name: 'Optimization Problems',
      description: 'Find the best solution among all valid solutions',
    },
    {
      name: 'Enumeration Problems',
      description: 'Find all possible solutions (all permutations, subsets)',
    },
    {
      name: 'Constraint Satisfaction',
      description: 'Find solutions that satisfy all constraints (Sudoku)',
    },
  ],
  operations: [
    {
      name: 'N-Queens',
      description: 'Place N queens on NxN board',
      timeComplexity: 'O(N!)',
    },
    {
      name: 'Sudoku Solver',
      description: 'Fill 9x9 grid with constraints',
      timeComplexity: 'O(9^(n*n))',
    },
    {
      name: 'Generate Permutations',
      description: 'All arrangements of n elements',
      timeComplexity: 'O(N! * N)',
    },
    {
      name: 'Generate Subsets',
      description: 'All subsets of n elements',
      timeComplexity: 'O(2^N * N)',
    },
    {
      name: 'Combination Sum',
      description: 'Find combinations summing to target',
      timeComplexity: 'O(2^N)',
    },
  ],
  advantages: [
    'Guarantees finding a solution if one exists',
    'Can find all solutions, not just one',
    'Prunes invalid paths early, saving time',
    'Natural for constraint satisfaction problems',
    'Relatively easy to implement with recursion',
  ],
  disadvantages: [
    'Exponential time complexity in worst case',
    'Can be slow for large problem spaces',
    'High memory usage due to recursion stack',
    'May explore many dead ends before finding solution',
    'Not suitable for optimization without heuristics',
  ],
  applications: [
    'Puzzle solving (Sudoku, Crosswords)',
    'Game AI (Chess, Tic-tac-toe)',
    'Constraint satisfaction problems',
    'Generating permutations and combinations',
    'Path finding in mazes',
    'Compiler optimization',
  ],
};
